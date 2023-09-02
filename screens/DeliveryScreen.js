import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { XCircle } from "@nandorojo/heroicons/20/solid";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import MapView, { Marker } from "react-native-maps";
const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View style={{ backgroundColor: "#00ccbb", flex: 1 }}>
      <SafeAreaView>
        <View style={styles.deliveryScreen__top}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XCircleIcon height={40} width={40} color="white" />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 20 }}>Order Help</Text>
        </View>
        <View style={styles.deliveryScreen__middle}>
          <View>
            <Text style={{ color: "gray", fontSize: 18, marginBottom: 5 }}>
              Estimated Arrival
            </Text>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", marginBottom: 20 }}
            >
              45 - 55 minutes
            </Text>
            <Progress.Bar indeterminate={true} color="#00ccbb" />
            <Text style={{ color: "gray", marginTop: 10 }}>
              Your order at {restaurant.title} is being prepared
            </Text>
          </View>
          <Image
            source={{
              uri: "https://links.papareact.com/fls",
            }}
            style={{ height: 70, width: 70 }}
          />
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: 28.6448,
          longitude: 77.216721,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        style={styles.map}
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: 28.6448,
            longitude: 77.216721,
          }}
          title={restaurant.title}
          description={restaurant.shortDesc}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>
      <SafeAreaView style={styles.deliveryScreen__bottom}>
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          style={{
            height: 50,
            width: 50,
            backgroundColor: "lightgray",
            borderRadius: 999,
            left: 20,
          }}
        />
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>John Smith</Text>
          <Text style={{ color: "gray" }}>Your Rider</Text>
        </View>
        <Text style={{ color: "#00ccbb", marginRight: 20, fontSize: 19 }}>
          Call
        </Text>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  deliveryScreen__top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  deliveryScreen__middle: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    zIndex: 50,
  },
  map: {
    flex: 1,
    zIndex: -1,
    marginTop: -30,
  },
  deliveryScreen__bottom: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    paddingTop: 40,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    position: "absolute",
    position: "absolute",
    bottom: 0,
    left: 0,
    gap: 20,
  },
});
export default DeliveryScreen;
