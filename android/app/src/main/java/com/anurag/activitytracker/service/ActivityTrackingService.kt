package com.anurag.activitytracker.service

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import com.anurag.activitytracker.R
import com.anurag.activitytracker.data.ActivityClassifier
import com.anurag.activitytracker.data.ClassifiedActivity
import com.anurag.activitytracker.data.TrackingStateStore
import com.anurag.activitytracker.network.ActivityApiClient
import com.anurag.activitytracker.network.ActivityRequest
import com.anurag.activitytracker.system.LockStateDetector
import com.anurag.activitytracker.usage.UsageStatsReader
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch

class ActivityTrackingService : Service() {
    private lateinit var usageStatsReader: UsageStatsReader
    private lateinit var lockStateDetector: LockStateDetector
    private lateinit var stateStore: TrackingStateStore
    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
    private var trackingJob: Job? = null
    private var lastSentPackage: String? = null
    private var lastSentActivity: String? = null

    override fun onCreate() {
        super.onCreate()
        usageStatsReader = UsageStatsReader(this)
        lockStateDetector = LockStateDetector(this)
        stateStore = TrackingStateStore(this)
        createNotificationChannel()
        startForeground(NOTIFICATION_ID, buildNotification())
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_STOP -> stopTracking()
            else -> startTracking()
        }
        return START_NOT_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        trackingJob?.cancel()
        serviceScope.cancel()
        if (::stateStore.isInitialized) {
            stateStore.setTracking(false)
        }
        super.onDestroy()
    }

    private fun startTracking() {
        if (trackingJob?.isActive == true) return
        stateStore.setTracking(true)
        trackingJob = serviceScope.launch {
            while (isActive) {
                val packageName = usageStatsReader.mostRecentlyForegroundedPackage()
                val classifiedActivity = ActivityClassifier.classify(
                    packageName,
                    lockStateDetector.isLocked()
                )
                if (classifiedActivity != null) {
                    stateStore.setDetectedActivity(
                        classifiedActivity.packageName,
                        classifiedActivity.action
                    )
                    if (
                        classifiedActivity.packageName != lastSentPackage ||
                        classifiedActivity.action != lastSentActivity
                    ) {
                        Log.d(
                            TAG,
                            "Activity detected: ${classifiedActivity.app} / " +
                                "${classifiedActivity.packageName} / ${classifiedActivity.action}"
                        )
                        lastSentPackage = classifiedActivity.packageName
                        lastSentActivity = classifiedActivity.action
                        sendActivity(classifiedActivity)
                    }
                }
                delay(POLL_INTERVAL_MILLIS)
            }
        }
    }

    private fun sendActivity(activity: ClassifiedActivity) {
        serviceScope.launch(Dispatchers.IO) {
            try {
                Log.d(TAG, "Sending activity to backend...")
                val response = ActivityApiClient.api.createActivity(
                    ActivityRequest(
                        app = activity.app,
                        packageName = activity.packageName,
                        action = activity.action,
                        startedAt = System.currentTimeMillis()
                    )
                )
                if (response.isSuccessful) {
                    Log.d(TAG, "Backend response: ${response.code()}")
                } else {
                    Log.e(TAG, "Backend response: ${response.code()}")
                }
            } catch (exception: Exception) {
                Log.e(TAG, "Failed to send activity to backend", exception)
            }
        }
    }

    private fun stopTracking() {
        stateStore.setTracking(false)
        stopSelf()
    }

    private fun buildNotification(): Notification = NotificationCompat.Builder(this, CHANNEL_ID)
        .setSmallIcon(R.drawable.ic_launcher_foreground)
        .setContentTitle(getString(R.string.app_name))
        .setContentText("Monitoring activity")
        .setOngoing(true)
        .setCategory(NotificationCompat.CATEGORY_SERVICE)
        .setPriority(NotificationCompat.PRIORITY_LOW)
        .build()

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Activity tracking",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Shows when local activity tracking is active"
            }
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }
    }

    companion object {
        private const val TAG = "ActivityTrackingService"
        const val ACTION_STOP = "com.anurag.activitytracker.action.STOP"
        const val CHANNEL_ID = "activity_tracking"
        const val NOTIFICATION_ID = 1001
        const val POLL_INTERVAL_MILLIS = 2_000L
    }
}