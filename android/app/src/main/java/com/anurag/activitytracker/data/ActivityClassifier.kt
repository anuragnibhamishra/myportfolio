package com.anurag.activitytracker.data

data class ClassifiedActivity(
    val app: String,
    val packageName: String,
    val action: String
)

object ActivityClassifier {
    const val LOCKED_PACKAGE = "android.locked"
    const val LOCKED_APP = "Locked"
    const val LOCKED_ACTION = "Working on laptop"
    private const val UNKNOWN_ACTION = "Using phone"

    fun classify(packageName: String?, isLocked: Boolean): ClassifiedActivity? {
        if (isLocked) {
            return ClassifiedActivity(LOCKED_APP, LOCKED_PACKAGE, LOCKED_ACTION)
        }

        if (packageName.isNullOrBlank()) return null

        val knownApp = AppMapping.knownAppFor(packageName)
        val appName = knownApp?.displayName ?: packageName
        val action = knownApp?.let { ActivityMapping.publicActivityFor(it.displayName) }
            ?: UNKNOWN_ACTION
        return ClassifiedActivity(appName, packageName, action)
    }
}