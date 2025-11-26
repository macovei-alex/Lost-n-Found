import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useAuthContext } from "src/context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginStackParamList } from "src/navigation/LoginStackNavigator";
import { ENV } from "src/config/env";

type Props = NativeStackScreenProps<LoginStackParamList, "LoginScreen">;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email";
    if (!password.trim()) return "Password is required";
    return "";
  };

  const handleLogin = async () => {
    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${ENV.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setErrorMsg("Incorrect email or password");
        setLoading(false);
        return;
      }

      const data = await response.json();
      await login(data.token);
    } catch (e) {
      setErrorMsg("Server error");
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.footerText}>
            Don't have an account? <Text style={styles.link}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { width: "90%", padding: 24, backgroundColor: "#fff", borderRadius: 16 },
  title: { fontSize: 26, fontWeight: "600", marginBottom: 16, textAlign: "center" },
  error: { color: "red", textAlign: "center", marginBottom: 12 },
  input: {
    height: 48,
    backgroundColor: "#EEE",
    borderRadius: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: "#0066FF",
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600", fontSize: 18 },
  footerText: { textAlign: "center", marginTop: 16 },
  link: { color: "#0066FF", fontWeight: "600" },
});
