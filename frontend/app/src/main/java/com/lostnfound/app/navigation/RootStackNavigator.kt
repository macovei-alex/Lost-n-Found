package com.lostnfound.app.navigation

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

val LocalRootNavController = compositionLocalOf<NavHostController> {
  error("No NavController provided")
}

@Composable
fun RootStackNavigator(rootNavController: NavHostController = rememberNavController()) {
  CompositionLocalProvider(LocalRootNavController provides rootNavController) {
    NavHost(
      navController = rootNavController,
      startDestination = NavRoute.MainTabs.Root.route,
      route = NavRoute.Root.route,
    ) {
      composable(NavRoute.MainTabs.Root.route) { MainTabsNavigator() }
      composable(NavRoute.OutsideOfTabs.route) { TestScreen() }
    }
  }
}

@Composable
fun TestScreen() {
  val rootNavController = LocalRootNavController.current

  Box(
    modifier = Modifier.fillMaxSize(),
    contentAlignment = Alignment.Center
  ) {
    Text(text = "Test Screen")
    Button(onClick = { rootNavController.popBackStack() }) {
      Text("Go to Tabs")
    }
  }
}