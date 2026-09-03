package com.anurag.activitytracker.data

data class KnownApp(
    val packageName: String,
    val displayName: String
)

object AppMapping {
    private val knownApps = listOf(
        KnownApp("com.instagram.android", "Instagram"),
        KnownApp("com.google.android.youtube", "YouTube"),
        KnownApp("com.spotify.music", "Spotify"),
        KnownApp("com.android.chrome", "Chrome"),
        KnownApp("com.microsoft.vscode", "VS Code")
    )

    fun displayNameFor(packageName: String): String =
        knownApps.firstOrNull { it.packageName == packageName }?.displayName ?: packageName
}