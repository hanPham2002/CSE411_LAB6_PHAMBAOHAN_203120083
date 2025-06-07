import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { Customer } from "@/components/interface";
import CustomerCard from "@/components/CustomerCard";

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
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#D4A73E",
          height: 50,
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
      </View>
      <FlatList
        style={{ marginBottom: 120 }}
        data={customer}
        renderItem={({ item }) => (
          <CustomerCard
            name={item.name}
            phone={item.phone}
            totalSpent={item.totalSpent}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
};

export default Customers;

const styles = StyleSheet.create({});
