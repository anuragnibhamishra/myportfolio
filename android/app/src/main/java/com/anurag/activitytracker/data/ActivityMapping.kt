package com.anurag.activitytracker.data

object ActivityMapping {
    private val activities = mapOf(
        "Instagram" to "Scrolling Instagram",
        "YouTube" to "Watching YouTube",
        "Spotify" to "Listening to Spotify",
        "Chess" to "Playing Chess",
        "Chrome" to "Browsing Chrome",
        "WhatsApp" to "Available on WhatsApp"
    )

    fun publicActivityFor(displayName: String): String? = activities[displayName]
}