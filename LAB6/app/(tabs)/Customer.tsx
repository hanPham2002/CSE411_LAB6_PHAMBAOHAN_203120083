import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { Customer } from "@/components/interface";
import CustomerCard from "@/components/CustomerCard";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";

const Customers = () => {
  const [customer, setCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    try {
      axios
        .get("https://kami-backend-5rs0.onrender.com/customers")
        .then((res) => {
          setCustomer(res.data);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#D4A73E",
            height: 70,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: "#ECE1BC",
              fontSize: 25,
              paddingVertical: 20,
              height: 70,
            }}
          >
            Customer
          </Text>
          <TouchableOpacity>
            <Image
              style={{ width: 30, height: 30 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ marginBottom: 50 }}
          data={customer}
          renderItem={({ item }) => (
            <CustomerCard
              name={item.name}
              phone={item.phone}
              totalSpent={item.totalSpent}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>

      <View style={styles.fabContainer}>
        <TouchableOpacity onPress={() => router.push("/AddCustomer")}>
          <IconButton icon="plus" iconColor="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Customers;

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 10,
    right: 30,
    backgroundColor: "#D4A73E",
    borderRadius: 50,
    elevation: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    marginBottom: 80,
    width: 50,
    height: 50,
  },
});
