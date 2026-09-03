package com.anurag.activitytracker.data

object ActivityMapping {
    private val activities = mapOf(
        "Instagram" to "Scrolling Instagram",
        "YouTube" to "Watching YouTube",
        "Spotify" to "Listening to Spotify",
        "VS Code" to "Coding",
        "Chrome" to "Browsing"
    )

    fun publicActivityFor(displayName: String): String? = activities[displayName]
}