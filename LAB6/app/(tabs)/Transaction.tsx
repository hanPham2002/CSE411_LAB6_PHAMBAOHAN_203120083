import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Transaction } from "@/components/interface";
import TransactionCard from "@/components/TransactionCard";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    <SafeAreaView>
      <View>
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
          style={{ marginBottom: 50 }}
          data={transactions}
          renderItem={({ item }) => (
            <TransactionCard
              id={item.id}
              createdAt={item.createdAt}
              services={item.services}
              _id={""}
              customer={undefined}
              createBy={undefined}
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
