package com.anurag.activitytracker.data

data class KnownApp(
    val packageName: String,
    val displayName: String
)

object AppMapping {
    private val knownApps = listOf(
        KnownApp("com.spotify.music", "Spotify"),
        KnownApp("com.google.android.youtube", "YouTube"),
        KnownApp("com.instagram.android", "Instagram"),
        KnownApp("com.chess", "Chess"),
        KnownApp("com.android.chrome", "Chrome"),
        KnownApp("com.whatsapp", "WhatsApp")
    )

    fun knownAppFor(packageName: String): KnownApp? =
        knownApps.firstOrNull { it.packageName == packageName }

    fun displayNameFor(packageName: String): String =
        knownAppFor(packageName)?.displayName ?: packageName
}