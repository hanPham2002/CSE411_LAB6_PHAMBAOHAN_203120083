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

const AddCustomer = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const BASE_URL = "https://kami-backend-5rs0.onrender.com";
  const handleAddCustomer = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user: User | null = userData ? JSON.parse(userData) : null;

      if (!user?.token) {
        Alert.alert("Error", "No user token found");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/customers`,

        {
          name,
          phone: parseFloat(phone),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Customer added:", response.data);
        Alert.alert("Success", "Customer added");
        router.push("/Customer");
      } else {
        Alert.alert("Add Failed", "Unexpected customer response");
      }
    } catch (error: any) {
      console.error("Add error:", error?.response?.data || error.message);
      Alert.alert("Add Failed", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer name *</Text>
      <TextInput
        style={Styles.input}
        placeholder="Input customer name"
        onChangeText={setName}
        value={name}
      />
      <Text style={styles.label}>Phone *</Text>
      <TextInput
        style={Styles.input}
        placeholder="..."
        value={phone}
        keyboardType="numeric"
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddCustomer}>
        <Text style={Styles.buttonText as StyleProp<TextStyle>}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
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
