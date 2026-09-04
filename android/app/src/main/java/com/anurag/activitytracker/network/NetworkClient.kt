package com.anurag.activitytracker.network

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object NetworkConfig {
    const val BASE_URL = "http://192.168.43.102:5000/"
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
