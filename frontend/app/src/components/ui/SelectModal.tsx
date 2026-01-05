import { Modal, Pressable, View } from "react-native";
import { Text } from "./Text";
import { StyleSheet } from "react-native-unistyles";

interface SelectOption<T> {
  label: string;
  value: T;
}

interface SelectModalProps<T> {
  visible: boolean;
  title: string;
  options: SelectOption<T>[];
  onSelect: (value: T) => void;
  onClose: () => void;
}

export function SelectModal<T>({ visible, title, options, onSelect, onClose }: SelectModalProps<T>) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{title}</Text>

          {options.map((option) => (
            <Pressable key={option.label} style={styles.option} onPress={() => onSelect(option.value)}>
              <Text style={styles.optionText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceA10,
  },
  label: {
    fontWeight: "600",
    color: theme.colors.primaryA0,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    borderRadius: 12,
    padding: 16,
    backgroundColor: theme.colors.surfaceA0,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
  },
}));
