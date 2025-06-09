import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Transaction } from "@/components/interface";

const TransactionCard = ({
  id,
  customer,
  services,
  createdAt,
  priceBeforePromotion,
  status,
}: Transaction) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 7,
          marginHorizontal: 10,
          width: 390,
          marginBottom: -60,
          padding: 5,
        }}
      >
        <View style={styles.card}>
          <Text style={styles.textStyle}>
            <Text style={{ color: "red" }}>{status}</Text> - {id} - {createdAt}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              {services.map((item, index) => (
                <Text style={styles.textStyle} key={index}>
                  - {item.name}
                </Text>
              ))}
            </View>

            <Text style={styles.price}>{priceBeforePromotion} đ</Text>
          </View>

          <Text style={styles.textStyle}>Customer : {customer.name}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  textStyle: {
    paddingHorizontal: 2,
    paddingBottom: 5,
  },
  price: {
    color: "#D4A73E",
    fontSize: 17,
    marginRight: 30,
    marginTop: 10,
  },
  card: {
    padding: 5,
    borderRadius: 7,
    width: 390,
    overflow: "hidden", // Ẩn nội dung bị tràn
  },
});
