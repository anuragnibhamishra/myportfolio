package com.anurag.activitytracker.usage

import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context
import android.os.Build

class UsageStatsReader(context: Context) {
    private val appContext = context.applicationContext
    private val usageStatsManager =
        appContext.getSystemService(UsageStatsManager::class.java)

    fun mostRecentlyForegroundedPackage(): String? {
        val manager = usageStatsManager ?: return null
        val endTime = System.currentTimeMillis()
        val startTime = endTime - LOOKBACK_MILLIS
        val events = try {
            manager.queryEvents(startTime, endTime)
        } catch (_: SecurityException) {
            return null
        } catch (_: RuntimeException) {
            return null
        }
        var latestPackage: String? = null
        var latestTimestamp = 0L
        val event = UsageEvents.Event()

        while (events.hasNextEvent()) {
            events.getNextEvent(event)
            val isForegroundEvent = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                event.eventType == UsageEvents.Event.ACTIVITY_RESUMED
            } else {
                event.eventType == UsageEvents.Event.MOVE_TO_FOREGROUND
            }
            if (isForegroundEvent && event.packageName != appContext.packageName && event.timeStamp >= latestTimestamp) {
                latestTimestamp = event.timeStamp
                latestPackage = event.packageName
            }
        }

        return latestPackage
    }

    private companion object {
        const val LOOKBACK_MILLIS = 24 * 60 * 60 * 1000L
    }
}