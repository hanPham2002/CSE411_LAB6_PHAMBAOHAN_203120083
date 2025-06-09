import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Transaction } from "@/components/interface";
import TransactionCard from "@/components/TransactionCard";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    try {
      axios
        .get("https://kami-backend-5rs0.onrender.com/transactions")
        .then((res) => {
          setTransactions(res.data);
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
            Transaction
          </Text>
        </View>

        <FlatList
          contentContainerStyle={{
            paddingBottom: 90,

            // backgroundColor: "lightblue",
          }}
          data={transactions}
          renderItem={({ item }) => (
            <TransactionCard
              id={item.id}
              createdAt={item.createdAt}
              services={item.services}
              _id={item._id}
              customer={item.customer}
              status={item.status}
              priceBeforePromotion={item.priceBeforePromotion}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
