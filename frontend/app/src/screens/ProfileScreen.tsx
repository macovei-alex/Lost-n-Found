import React, { useState } from "react";
import { View, ScrollView, Alert, RefreshControl } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useAuthContext } from "src/context/AuthContext";
import { Text, Button, UserAvatar, ActivityIndicator } from "src/components/ui";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "src/utils/date";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type ProfileStackParamList } from "src/navigation/ProfileStackNavigator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadMeInformation } from "src/api/options/loadMeInformation";

type NavigationProps = NativeStackNavigationProp<ProfileStackParamList, "ProfileScreen">;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { jwtClaims, logout, api, token } = useAuthContext();
  const queryClient = useQueryClient();
  const meQuery = useQuery(loadMeInformation(api, token));
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!jwtClaims) {
    return (
      <View style={styles.container}>
        <Text>No user data available</Text>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out from your account?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoggingOut(true);
            await logout();
          } catch (error) {
            Alert.alert("Error", "Failed to disconnect. Please try again.");
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ]);
  };

  const handleViewMyPosts = () => {
    Alert.alert("TODO");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={meQuery.isRefetching}
          onRefresh={() => {
            queryClient.removeQueries(meQuery);
            meQuery.refetch();
          }}
        />
      }
    >
      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <UserAvatar fullName={jwtClaims.name} size="large" />
        <Text style={styles.name}>{jwtClaims.name}</Text>
      </View>

      {/* Account Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{jwtClaims.sub}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Full Name</Text>
          <Text style={styles.infoValue}>{jwtClaims.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member Since</Text>
          {meQuery.data ? (
            <Text style={styles.infoValue}>{formatDate(meQuery.data.createdAt)}</Text>
          ) : (
            <ActivityIndicator size="small" />
          )}
        </View>
      </View>

      {/* Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>

        <Button title="My Posts" onPress={handleViewMyPosts} style={styles.actionButton} />

        <Button
          title={isLoggingOut ? "Logging Out..." : "Log Out"}
          onPress={handleLogout}
          disabled={isLoggingOut}
          style={[styles.actionButton, styles.logoutButton]}
          textStyle={styles.logoutButtonText}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceA0,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: theme.colors.surfaceA10,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    opacity: 0.6,
  },
  section: {
    backgroundColor: theme.colors.surfaceA10,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceA10,
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
    marginLeft: 12,
  },
  actionButton: {
    marginBottom: 12,
    paddingVertical: 14,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: theme.colors.dangerA0,
  },
  logoutButtonText: {
    color: theme.colors.textOpposite,
  },
}));
