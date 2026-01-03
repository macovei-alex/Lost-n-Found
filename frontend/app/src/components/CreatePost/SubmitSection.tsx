import React from "react";
import { View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Button, Text, TouchableOpacity, ActivityIndicator } from "src/components/ui";

type SubmitSectionProps = {
  error: string | null;
  isValid: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function SubmitSection({
  error,
  isValid,
  isSubmitting,
  onCancel,
  onSubmit,
}: SubmitSectionProps) {
  const { theme } = useUnistyles();

  return (
    <View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.submitRow}>
        {!isSubmitting && (
          <Button
            title="Cancel"
            onPress={onCancel}
            disabled={isSubmitting}
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit} disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator size="large" color={theme.colors.textOpposite} />
          ) : (
            <Text style={styles.submitText}>Publish</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  error: {
    color: theme.colors.dangerA0,
    marginTop: 4,
  },
  submitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  submitButton: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: theme.colors.primaryA10,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  submitText: {
    color: theme.colors.textOpposite,
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    backgroundColor: theme.colors.surfaceA30,
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
}));
