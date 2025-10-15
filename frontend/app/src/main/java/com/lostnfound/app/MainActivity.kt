package com.lostnfound.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.lostnfound.app.navigation.RootStackNavigator
import com.lostnfound.app.ui.theme.LostnFoundTheme

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      LostnFoundTheme {
        RootStackNavigator()
      }
    }
  }
}
