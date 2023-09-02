import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 5000);
  });
  return (
    <SafeAreaView style={styles.preparing__orders}>
      <Animatable.Image
        source={require("../assets/deliveroo.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={{ height: 350, width: 350 }}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={{ fontSize: 17, fontWeight: 600, color: "#fff", padding: 20 }}
      >
        Waiting for restaurant to place your order!!
      </Animatable.Text>
      <ActivityIndicator size="large" color="#fff" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  preparing__orders: {
    flex: 1,
    backgroundColor: "#00ccbb",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PreparingOrderScreen;
