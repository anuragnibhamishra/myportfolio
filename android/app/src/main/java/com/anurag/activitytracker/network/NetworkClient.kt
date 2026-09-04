package com.anurag.activitytracker.network

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object NetworkConfig {
    // Production is the default for physical-device builds.
    const val BASE_URL = "https://myportfolio-production-5da1.up.railway.app/"

    // Development fallback for a local server on the Android emulator or LAN device.
    const val LOCAL_BASE_URL = "http://localhost:5000/"
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
