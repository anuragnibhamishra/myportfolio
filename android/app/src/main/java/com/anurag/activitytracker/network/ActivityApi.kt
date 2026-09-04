package com.anurag.activitytracker.network

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

data class ActivityRequest(
    val app: String,
    val packageName: String,
    val action: String,
    val startedAt: Long
)

interface ActivityApi {
    @POST("api/activity")
    suspend fun createActivity(@Body request: ActivityRequest): Response<Unit>
}
