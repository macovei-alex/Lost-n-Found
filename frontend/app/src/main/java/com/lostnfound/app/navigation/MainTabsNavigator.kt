package com.lostnfound.app.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.lostnfound.app.features.home.HomeScreen
import com.lostnfound.app.features.search.SearchScreen

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
      composable(NavRoute.MainTabs.Home.route) { HomeScreen() }
      composable(NavRoute.MainTabs.Search.route) { SearchScreen() }
      profileNavGraph(tabsNavController)
    }
  }
}

val bottomTabItems = listOf(
  NavRoute.MainTabs.Home,
  NavRoute.MainTabs.Search,
  NavRoute.MainTabs.Profile.Root
)

@Composable
fun BottomBar(navController: NavHostController) {
  val navBackStackEntry by navController.currentBackStackEntryAsState()
  val currentRoute = navBackStackEntry?.destination?.route

  NavigationBar(modifier = Modifier.padding(0.dp)) {
    bottomTabItems.forEach { item ->
      NavigationBarItem(
        modifier = Modifier.padding(0.dp),
        icon = { item.icon?.let { Icon(it, contentDescription = item.label) } },
        selected = currentRoute?.startsWith(item.route) == true,
        onClick = {
          if (currentRoute?.startsWith(item.route) == false) {
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
