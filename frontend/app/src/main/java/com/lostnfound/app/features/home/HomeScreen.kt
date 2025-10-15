package com.lostnfound.app.features.home

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.lostnfound.app.navigation.LocalRootNavController

@Composable
fun HomeScreen() {
  val rootNavController = LocalRootNavController.current

  Box(
    modifier = Modifier.fillMaxSize(),
    contentAlignment = Alignment.Center
  ) {
    Text(text = "👤 Profile Screen")
    Button (onClick = { rootNavController.navigate("outside_of_tabs") }) {
      Text("Go to outside of the tabs navigator")
    }
  }
}