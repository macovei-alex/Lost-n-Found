package com.lostnfound.app.navigation

import androidx.compose.runtime.compositionLocalOf
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavHostController
import androidx.navigation.compose.composable
import androidx.navigation.navigation
import com.lostnfound.app.features.profile.ProfileScreen
import com.lostnfound.app.features.profile.ProfileSecondScreen

fun NavGraphBuilder.profileNavGraph(tabsNavController: NavHostController) {
  navigation(startDestination = "profile_main", route = "profile") {
    composable("profile_main") { ProfileScreen(tabsNavController) }
    composable("profile_second") { ProfileSecondScreen(tabsNavController) }
  }
}
