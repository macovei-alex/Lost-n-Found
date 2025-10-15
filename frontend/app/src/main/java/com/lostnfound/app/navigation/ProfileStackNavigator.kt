package com.lostnfound.app.navigation

import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavHostController
import androidx.navigation.compose.composable
import androidx.navigation.navigation
import com.lostnfound.app.features.profile.ProfileScreen
import com.lostnfound.app.features.profile.ProfileSecondScreen

fun NavGraphBuilder.profileNavGraph(tabsNavController: NavHostController) {
  navigation(
    route = NavRoute.MainTabs.Profile.Root.route,
    startDestination = NavRoute.MainTabs.Profile.Main.route,
  ) {
    composable(NavRoute.MainTabs.Profile.Main.route) { ProfileScreen(tabsNavController) }
    composable(NavRoute.MainTabs.Profile.Second.route) { ProfileSecondScreen(tabsNavController) }
  }
}
