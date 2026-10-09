package com.anurag.activitytracker.network

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object NetworkConfig {
    // Update this to your Render backend URL before release builds.
    const val BASE_URL = "https://your-render-service.onrender.com/"

    // Development fallback for a local server on the Android emulator.
    const val LOCAL_BASE_URL = "http://10.0.2.2:5000/"
}

object ActivityApiClient {
    val api: ActivityApi by lazy {
        Retrofit.Builder()
            .baseUrl(NetworkConfig.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ActivityApi::class.java)
    }
}
