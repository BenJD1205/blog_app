import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    setError('')
    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }
    try {
      const URI = 'http://localhost:5000'
      const { data } = await axios.post(
        `${URI}/auth/register`,
        {
          username,
          email,
          password,
        }
      );
      await AsyncStorage.setItem("authToken", data.token);

      setTimeout(() => {

        navigation.navigate("Profile")

      }, 1800)

    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Bloger</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          value={password}
          style={styles.inputText}
          secureTextEntry={true}
          placeholder="Mật khẩu"
          placeholderTextColor="#003f5c"
          onChangeText={setPassword} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          value={confirmpassword}
          style={styles.inputText}
          secureTextEntry={true}
          placeholder="Xác nhập mật khẩu"
          placeholderTextColor="#003f5c"
          onChangeText={setConfirmPassword} />
      </View>
      <Text style={styles.textError}>
        {error}
      </Text>
      <TouchableOpacity>
        <Text style={styles.forgot} onPress={() => navigation.navigate('Profile')}>Đã có tài khoản</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={loginHandler}>
        <Text style={styles.loginText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#0063a5",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#6971741a",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderColor: 'gray',
    borderWidth: 1
  },
  inputText: {
    height: 50,
    fontWeight: "600",
    color: "#0063a5"
  },
  forgot: {
    color: "#0063a5",
    fontSize: 11,
    fontWeight: "600",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#0063a5",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    fontWeight: "600",
    color: "white"
  },
  textError: {
    color: "red"
  }
});

export default Register;

