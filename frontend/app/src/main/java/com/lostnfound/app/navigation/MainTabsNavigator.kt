package com.lostnfound.app.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.lostnfound.app.features.home.HomeScreen
import com.lostnfound.app.features.search.SearchScreen

sealed class BottomNavItem(
  val route: String,
  val icon: ImageVector,
  val label: String
) {
  object Home : BottomNavItem("home", Icons.Filled.Home, "Home")
  object Search : BottomNavItem("search", Icons.Filled.Search, "Search")
  object Profile : BottomNavItem("profile", Icons.Filled.Person, "Profile")
}

val bottomNavItems = listOf(
  BottomNavItem.Home,
  BottomNavItem.Search,
  BottomNavItem.Profile
)

@Composable
fun MainTabsNavigator() {
  // Create a NavController just for tabs
  val tabsNavController = rememberNavController()

  Scaffold(
    bottomBar = { BottomBar(navController = tabsNavController) }
  ) { innerPadding ->
    NavHost(
      navController = tabsNavController,
      startDestination = "home",
      modifier = Modifier.padding(innerPadding)
    ) {
      composable(BottomNavItem.Home.route) { HomeScreen() }
      composable(BottomNavItem.Search.route) { SearchScreen() }
      profileNavGraph(tabsNavController)
    }
  }
}

@Composable
fun BottomBar(navController: NavHostController) {
  val navBackStackEntry by navController.currentBackStackEntryAsState()
  val currentRoute = navBackStackEntry?.destination?.route

  NavigationBar (modifier = Modifier.padding(0.dp)) {
    bottomNavItems.forEach { item ->
      NavigationBarItem(
        modifier = Modifier.padding(0.dp),
        icon = { Icon(item.icon, contentDescription = item.label) },
        selected = currentRoute == item.route,
        onClick = {
          if (currentRoute != item.route) {
            navController.navigate(item.route) {
              popUpTo(navController.graph.startDestinationId) { saveState = true }
              launchSingleTop = true
              restoreState = true
            }
          }
        }
      )
    }
  }
}
