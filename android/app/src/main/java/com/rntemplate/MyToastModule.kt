package com.rntemplate

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import android.content.Intent
import android.content.IntentFilter
import com.facebook.react.bridge.Promise

import android.os.Build
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments

import android.content.Context
import android.telephony.TelephonyManager


class MyToastModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "MyToast"
    }

    @ReactMethod
    fun show(message: String) {
        Toast.makeText(reactApplicationContext, message, Toast.LENGTH_SHORT).show()
    }

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
    try {
        val batteryIntent = reactApplicationContext.registerReceiver(
            null,
            IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        )
        val level = batteryIntent?.getIntExtra("level", -1) ?: -1
        val scale = batteryIntent?.getIntExtra("scale", -1) ?: -1

        if (level == -1 || scale == -1) {
            promise.reject("ERROR", "Could not get battery level.")
        } else {
            val batteryLevel = level * 100 / scale.toFloat()
            promise.resolve(batteryLevel)
        }
    } catch (e: Exception) {
        promise.reject("ERROR", e.message)
    }
}

@ReactMethod
fun getDeviceInfo(promise: Promise) {
    try {
        val deviceInfo: WritableMap = Arguments.createMap()
        deviceInfo.putString("manufacturer", Build.MANUFACTURER)
        deviceInfo.putString("model", Build.MODEL)
        deviceInfo.putString("brand", Build.BRAND)
        deviceInfo.putString("device", Build.DEVICE)
        deviceInfo.putString("product", Build.PRODUCT)
        deviceInfo.putString("osVersion", Build.VERSION.RELEASE)
        deviceInfo.putInt("apiLevel", Build.VERSION.SDK_INT)

        promise.resolve(deviceInfo)
    } catch (e: Exception) {
        promise.reject("ERROR", e.message)
    }
}

  @ReactMethod
  fun getPhoneNumber(promise: Promise) {
    try {
      val telephonyManager = reactApplicationContext.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

      val number = telephonyManager.line1Number

      if (number.isNullOrEmpty()) {
        promise.reject("NO_NUMBER", "Phone number not available.")
      } else {
        promise.resolve(number)
      }
    } catch (e: SecurityException) {
      promise.reject("PERMISSION_DENIED", "Missing permission: ${e.message}")
    } catch (e: Exception) {
      promise.reject("ERROR", e.message)
    }
  }

}