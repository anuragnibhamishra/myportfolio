package com.anurag.activitytracker.ui

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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.repeatOnLifecycle
import com.anurag.activitytracker.data.ActivityMapping
import com.anurag.activitytracker.data.AppMapping
import com.anurag.activitytracker.usage.UsageStatsReader
import com.anurag.activitytracker.utils.UsageAccessPermission
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive

@Composable
fun ActivityTrackerScreen() {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current
    val usageStatsReader = remember { UsageStatsReader(context) }
    var hasUsageAccess by remember { mutableStateOf(UsageAccessPermission.isGranted(context)) }
    var packageName by remember { mutableStateOf<String?>(null) }

    LaunchedEffect(lifecycleOwner, usageStatsReader) {
        lifecycleOwner.lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
            while (isActive) {
                hasUsageAccess = UsageAccessPermission.isGranted(context)
                packageName = if (hasUsageAccess) {
                    usageStatsReader.mostRecentlyForegroundedPackage()
                } else {
                    null
                }
                delay(2_000)
            }
        }
    }

    val displayName = packageName?.let(AppMapping::displayNameFor)
    val publicActivity = displayName?.let(ActivityMapping::publicActivityFor)

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
            } else {
                Spacer(Modifier.height(40.dp))
                Text("Current Application", style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(16.dp))
                if (packageName == null) {
                    Text("Detecting...", color = MaterialTheme.colorScheme.onSurfaceVariant)
                } else {
                    Text(displayName.orEmpty(), style = MaterialTheme.typography.headlineSmall)
                    Spacer(Modifier.height(4.dp))
                    Text(packageName.orEmpty(), color = MaterialTheme.colorScheme.onSurfaceVariant)
                    publicActivity?.let {
                        Spacer(Modifier.height(16.dp))
                        Text(it, color = MaterialTheme.colorScheme.primary)
                    }
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