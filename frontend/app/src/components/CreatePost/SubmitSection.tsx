import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, Text, TouchableOpacity } from "src/components/ui";

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
  return (
    <>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.submitRow}>
        <Button title="Cancel" color="#777" onPress={onCancel} disabled={isSubmitting} />
        <TouchableOpacity
          style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
          onPress={onSubmit}
          disabled={!isValid || isSubmitting}
          activeOpacity={0.85}
        >
          {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Publish</Text>}
        </TouchableOpacity>
      </View>
    </>
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
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.surfaceA30,
  },
  submitText: {
    color: theme.colors.textOpposite,
    fontWeight: "700",
    fontSize: 16,
  },
}));
