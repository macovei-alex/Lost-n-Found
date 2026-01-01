import React from "react";
import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text } from "src/components/ui";

export type TextFieldConfig = {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: "none" | "sentences";
  keyboardType?: "url";
};

type FormTextFieldsProps = {
  fields: TextFieldConfig[];
  values: Record<string, any>;
  onChangeField: (key: string, value: string) => void;
};

export default function FormTextFields({ fields, values, onChangeField }: FormTextFieldsProps) {
  return (
    <>
      {fields.map(({ key, label, placeholder, multiline, numberOfLines, autoCapitalize, keyboardType }) => (
        <View key={key}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            value={values[key] || ""}
            onChangeText={(text) => onChangeField(key, text)}
            placeholder={placeholder}
            style={[styles.input, multiline && styles.multiline]}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={multiline ? "top" : "center"}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
          />
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  label: {
    color: theme.colors.primaryA30,
    fontWeight: "600",
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.surfaceA30,
    backgroundColor: theme.colors.surfaceA10,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: theme.colors.text,
  },
  multiline: {
    minHeight: 120,
  },
}));
