import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const total = useSelector(selectBasketTotal);
  if (items.length === 0) return null;
  return (
    <View
      style={{ position: "absolute", bottom: 50, zIndex: 50, width: "100%" }}
    >
      <TouchableOpacity
        style={styles.basket__icon}
        onPress={() => navigation.navigate("Basket")}
      >
        <Text style={styles.basket__icon__details}>{items.length}</Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
          }}
        >
          View Basket
        </Text>
        <Text style={{ fontSize: 17, color: "#fff", fontWeight: "bold" }}>
          <Currency quantity={total} currency="INR" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export const styles = StyleSheet.create({
  basket__icon: {
    backgroundColor: "#00CCBB",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  basket__icon__details: {
    fontSize: 17,
    backgroundColor: "#01A296",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    color: "white",
  },
});
export default BasketIcon;
