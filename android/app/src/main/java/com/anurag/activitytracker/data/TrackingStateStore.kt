package com.anurag.activitytracker.data

import android.content.Context

data class TrackingState(
    val isTracking: Boolean,
    val packageName: String?,
    val activityName: String?
)

class TrackingStateStore(context: Context) {
    private val preferences = context.applicationContext.getSharedPreferences(
        PREFERENCES_NAME,
        Context.MODE_PRIVATE
    )

    fun read(): TrackingState = TrackingState(
        isTracking = preferences.getBoolean(KEY_TRACKING, false),
        packageName = preferences.getString(KEY_PACKAGE, null),
        activityName = preferences.getString(KEY_ACTIVITY, null)
    )

    fun setTracking(enabled: Boolean) {
        preferences.edit().putBoolean(KEY_TRACKING, enabled).apply()
    }

    fun setDetectedActivity(packageName: String, activityName: String?) {
        preferences.edit()
            .putString(KEY_PACKAGE, packageName)
            .putString(KEY_ACTIVITY, activityName)
            .apply()
    }

    private companion object {
        const val PREFERENCES_NAME = "activity_tracking_state"
        const val KEY_TRACKING = "tracking_enabled"
        const val KEY_PACKAGE = "latest_package"
        const val KEY_ACTIVITY = "latest_activity"
    }
}