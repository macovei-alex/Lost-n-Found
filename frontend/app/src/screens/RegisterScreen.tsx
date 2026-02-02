import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuthContext } from "src/context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginStackParamList } from "src/navigation/LoginStackNavigator";
import { ENV } from "src/config/env";
import { StyleSheet } from "react-native-unistyles";

type Props = NativeStackScreenProps<LoginStackParamList, "RegisterScreen">;

export default function RegisterScreen({ navigation }: Props) {
  const { login } = useAuthContext();

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!username.trim()) return "Name is required";
    if (!phoneNumber.trim()) return "Phone number is required";
    if (phoneNumber.length < 10) return "Invalid phone number";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const register = async () => {
    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${ENV.API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phoneNumber, email, password }),
      });

      if (!response.ok) {
        setErrorMsg("Failed to create account");
        setLoading(false);
        return;
      }

      // Auto-login
      const loginResponse = await fetch(`${ENV.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await loginResponse.json();
      await login(data.token);
    } catch (e) {
      setErrorMsg("Server error");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={register}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.link}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.surfaceA0,
  },
  card: {
    width: "90%",
    padding: 24,
    backgroundColor: theme.colors.surfaceA10,
    borderRadius: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: theme.colors.primaryA10,
  },
  error: {
    color: theme.colors.dangerA10,
    textAlign: "center",
    marginBottom: 12,
  },
  input: {
    height: 48,
    backgroundColor: theme.colors.surfaceA20,
    borderRadius: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primaryA10,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: theme.colors.textOpposite,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  footerText: {
    textAlign: "center",
    marginTop: 16,
    color: theme.colors.text,
  },
  link: {
    color: theme.colors.primaryA10,
    fontWeight: "600",
  },
}));
