import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

const UMaterialIcons = withUnistyles(MaterialIcons);

export default function FeedListHeader() {
  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.greeting}>👋 Hello, Student!</Text>
      <Text style={headerStyles.title}>Your Lost & Found Feed</Text>
      <View style={headerStyles.actionsContainer}>
        <TouchableOpacity style={headerStyles.filterButton} activeOpacity={0.75}>
          <UMaterialIcons name="filter-list" size={20} color="#fff" />
          <Text style={headerStyles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={headerStyles.sortButton} activeOpacity={0.75}>
          <UMaterialIcons name="sort" size={20} color="#fff" />
          <Text style={headerStyles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create((theme) => ({
  container: {
    paddingTop: 32,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 12,
  },
  greeting: {
    fontSize: 16,
    color: theme.colors.primaryA10,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: theme.colors.primaryA10,
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primaryA0,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  filterText: {
    color: "#fff",
    marginLeft: 4,
    fontWeight: "600",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primaryA0,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  sortText: {
    color: "#fff",
    marginLeft: 4,
    fontWeight: "600",
  },
}));
