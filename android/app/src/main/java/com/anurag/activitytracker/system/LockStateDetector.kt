package com.anurag.activitytracker.system

import android.app.KeyguardManager
import android.content.Context
import android.os.PowerManager

class LockStateDetector(context: Context) {
    private val appContext = context.applicationContext
    private val powerManager = appContext.getSystemService(PowerManager::class.java)
    private val keyguardManager = appContext.getSystemService(KeyguardManager::class.java)

    fun isLocked(): Boolean =
        powerManager?.isInteractive == false || keyguardManager?.isKeyguardLocked == true
}