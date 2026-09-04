package com.anurag.activitytracker.ui

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import android.content.Intent
import androidx.core.content.ContextCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.repeatOnLifecycle
import com.anurag.activitytracker.data.AppMapping
import com.anurag.activitytracker.data.TrackingStateStore
import com.anurag.activitytracker.service.ActivityTrackingService
import com.anurag.activitytracker.utils.UsageAccessPermission
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive

@Composable
fun ActivityTrackerScreen() {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current
    val stateStore = remember { TrackingStateStore(context) }
    var hasUsageAccess by remember { mutableStateOf(UsageAccessPermission.isGranted(context)) }
    var trackingState by remember { mutableStateOf(stateStore.read()) }
    val startTracking = {
        val intent = Intent(context, ActivityTrackingService::class.java)
        ContextCompat.startForegroundService(context, intent)
    }
    val notificationPermissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestPermission(),
        onResult = { startTracking() }
    )

    LaunchedEffect(lifecycleOwner, stateStore) {
        lifecycleOwner.lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
            while (isActive) {
                hasUsageAccess = UsageAccessPermission.isGranted(context)
                trackingState = stateStore.read()
                delay(2_000)
            }
        }
    }

    val displayName = trackingState.packageName?.let(AppMapping::displayNameFor)
    val packageName = trackingState.packageName

    Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp, vertical = 32.dp),
            verticalArrangement = Arrangement.Top
        ) {
            Text("Activity Tracker", style = MaterialTheme.typography.headlineMedium)
            Spacer(Modifier.height(32.dp))
            Text("Usage Access", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(12.dp))
            PermissionStatus(hasUsageAccess)

            Spacer(Modifier.height(32.dp))
            Text("Tracking", style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(12.dp))
            TrackingStatus(trackingState.isTracking)

            if (!hasUsageAccess) {
                Spacer(Modifier.height(28.dp))
                Button(
                    onClick = { context.startActivity(UsageAccessPermission.settingsIntent()) },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.primary
                    )
                ) {
                    Text("Grant Usage Access")
                }
            } else if (!trackingState.isTracking) {
                Spacer(Modifier.height(24.dp))
                Button(
                    onClick = {
                        if (
                            Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                            context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) !=
                            PackageManager.PERMISSION_GRANTED
                        ) {
                            notificationPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
                        } else {
                            startTracking()
                        }
                    },
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text("Start Tracking")
                }
            } else {
                Spacer(Modifier.height(28.dp))
                Button(
                    onClick = {
                        val intent = Intent(context, ActivityTrackingService::class.java)
                            .setAction(ActivityTrackingService.ACTION_STOP)
                        context.startService(intent)
                    },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.error
                    )
                ) {
                    Text("Stop Tracking")
                }
            }

            if (packageName != null) {
                Spacer(Modifier.height(32.dp))
                Text("Current Application", style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(16.dp))
                Text(displayName.orEmpty(), style = MaterialTheme.typography.headlineSmall)
                Spacer(Modifier.height(4.dp))
                Text(packageName, color = MaterialTheme.colorScheme.onSurfaceVariant)
                trackingState.activityName?.let {
                    Spacer(Modifier.height(16.dp))
                    Text(it, color = MaterialTheme.colorScheme.primary)
                }
            }
        }
    }
}

@Composable
private fun PermissionStatus(granted: Boolean) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(
            text = if (granted) "●" else "○",
            color = if (granted) Color(0xFF86EFAC) else MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.width(10.dp))
        Text(if (granted) "Granted" else "Not Granted")
    }
}

@Composable
private fun TrackingStatus(active: Boolean) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(
            text = if (active) "●" else "○",
            color = if (active) Color(0xFF86EFAC) else MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(Modifier.width(10.dp))
        Text(if (active) "Tracking Active" else "Tracking Stopped")
    }
}