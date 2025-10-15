package com.lostnfound.app.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Search
import androidx.compose.ui.graphics.vector.ImageVector

sealed class NavRoute(
  val route: String,
  val icon: ImageVector? = null,
  val label: String? = null
) {
  data object Root : NavRoute("root_stack")

  sealed class MainTabs() {
    data object Root : NavRoute("main_tabs")
    data object Home : NavRoute("home", Icons.Filled.Home, "Home")
    data object Search : NavRoute("search", Icons.Filled.Search, "Search")

    sealed class Profile() {
      data object Root : NavRoute("profile", Icons.Filled.Person, "Profile")
      data object Main : NavRoute("profile_main")
      data object Second : NavRoute("profile_second")
    }
  }

  data object OutsideOfTabs : NavRoute("outside_of_tabs")
}
