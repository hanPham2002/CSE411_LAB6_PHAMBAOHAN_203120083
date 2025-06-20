import {
  Alert,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "@/components/Styles";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import { Label } from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/components/interface";
import axios from "axios";
import { router } from "expo-router";

const AddService = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const BASE_URL = "https://kami-backend-5rs0.onrender.com";
  const handleAddService = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user: User | null = userData ? JSON.parse(userData) : null;

      if (!user?.token) {
        Alert.alert("Error", "No user token found");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/services`,
        {
          name,
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Service added:", response.data);
        Alert.alert("Success", "Service added");
        router.push("/(tabs)");
      } else {
        Alert.alert("Add Failed", "Unexpected server response");
      }
    } catch (error: any) {
      console.error("Add error:", error?.response?.data || error.message);
      Alert.alert("Add Failed", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service name *</Text>
      <TextInput
        style={Styles.input}
        placeholder="Input a service name"
        onChangeText={setName}
        value={name}
      />

      <Text style={styles.label}>Price *</Text>
      <TextInput
        style={Styles.input}
        placeholder="0"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      {/* hiện lỗi */}
      {/* {errorNumber ? (
        <Text style={styles.errorNumber}>{errorNumber}</Text>
      ) : null} */}

      <TouchableOpacity style={styles.button} onPress={handleAddService}>
        <Text style={Styles.buttonText as StyleProp<TextStyle>}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddService;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorNumber: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#D4A73E",
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 16,
  },
});
