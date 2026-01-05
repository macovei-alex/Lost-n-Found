import { View } from "react-native";
import { Text, TouchableOpacity } from "src/components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { useAuthContext } from "src/context/AuthContext";
import { PageHeader } from "../ui";

export default function FeedListHeader() {
  const { jwtClaims } = useAuthContext();

  return (
    <PageHeader>
      <Text style={headerStyles.greeting}>👋 Hello, {jwtClaims?.name}!</Text>
      <Text style={headerStyles.title}>Your Lost & Found Feed</Text>
      <View style={headerStyles.actionsContainer}>
        <TouchableOpacity style={headerStyles.filterButton} activeOpacity={0.75}>
          <UMaterialIcons name="filter-list" size={20} />
          <Text style={headerStyles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={headerStyles.sortButton} activeOpacity={0.75}>
          <UMaterialIcons name="sort" size={20} />
          <Text style={headerStyles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>
    </PageHeader>
  );
}

const UMaterialIcons = withUnistyles(MaterialIcons, (theme) => ({
  color: theme.colors.textOpposite,
}));

const headerStyles = StyleSheet.create((theme) => ({
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
  },
  filterText: {
    color: theme.colors.textOpposite,
    marginLeft: 4,
    fontWeight: "600",
  },
  sortButton: {
    flexDirection: "row",
  },
  sortText: {
    color: theme.colors.textOpposite,
    marginLeft: 4,
    fontWeight: "600",
  },
}));
