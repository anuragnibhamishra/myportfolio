package com.anurag.activitytracker.usage

import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.util.Log
import android.os.Build

class UsageStatsReader(context: Context) {
    private val appContext = context.applicationContext
    private val usageStatsManager =
        appContext.getSystemService(UsageStatsManager::class.java)
    private val homePackages = findHomePackages()

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
            val packageName = event.packageName
            if (isForegroundEvent && !packageName.isNullOrBlank()) {
                Log.d(
                    TAG,
                    "UsageEvent: timestamp=${event.timeStamp} " +
                        "type=${eventTypeName(event.eventType)} package=$packageName"
                )
            }
            if (
                isForegroundEvent &&
                !packageName.isNullOrBlank() &&
                packageName != appContext.packageName &&
                packageName !in homePackages &&
                event.timeStamp >= latestTimestamp
            ) {
                latestTimestamp = event.timeStamp
                latestPackage = packageName
            }
        }

        return latestPackage
    }

    private fun findHomePackages(): Set<String> {
        val homeIntent = Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_HOME)
        return try {
            appContext.packageManager
                .queryIntentActivities(homeIntent, PackageManager.MATCH_DEFAULT_ONLY)
                .mapNotNull { it.activityInfo?.packageName }
                .toSet()
        } catch (_: RuntimeException) {
            emptySet()
        }
    }

    private fun eventTypeName(eventType: Int): String = when (eventType) {
        UsageEvents.Event.ACTIVITY_RESUMED -> "ACTIVITY_RESUMED"
        UsageEvents.Event.MOVE_TO_FOREGROUND -> "MOVE_TO_FOREGROUND"
        else -> eventType.toString()
    }

    private companion object {
        const val TAG = "UsageStatsReader"
        const val LOOKBACK_MILLIS = 24 * 60 * 60 * 1000L
    }
}