import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

interface CustomerProps {
  name: string;
  phone: number;
  totalSpent: number;
}
const CustomerCard = ({ name, phone, totalSpent }: CustomerProps) => {
  return (
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
      // onPress={() => {
      //   router.push()
      // }}
    >
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text style={styles.textStyle}>
            Custumer: <Text style={{ color: "black" }}>{name}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.textStyle}>Phone:{phone}</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>Total money:{totalSpent}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({
  textStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#919191",
  },
});
