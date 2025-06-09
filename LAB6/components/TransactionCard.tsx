import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Transaction } from "@/components/interface";

const TransactionCard = ({
  id,
  customer,
  services,
  createdAt,
}: Transaction) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 7,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: 390,
          height: 120,
          marginVertical: 10,
        }}
      >
        <View>
          <Text>
            {id} - {createdAt}
          </Text>
          {services.map((item, index) => (
            <Text key={index}>{item.name}</Text>
          ))}
          <Text>{customer.name}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
