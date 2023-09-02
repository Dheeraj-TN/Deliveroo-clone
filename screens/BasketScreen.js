import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Currency from "react-currency-formatter";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusCircle, XCircle } from "@nandorojo/heroicons/20/solid";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [getBasketIetms, setGetBasketItems] = useState([]);
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGetBasketItems(groupedItems);
  }, [items]);
  //   console.log(getBasketIetms);
  return (
    <View>
      <View style={styles.basketScreen__top}>
        <View style={{ flex: 1 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
          >
            Basket
          </Text>
          <Text style={{ textAlign: "center", fontSize: 18, color: "gray" }}>
            {restaurant.title}
          </Text>
        </View>
        <TouchableOpacity onPress={navigation.goBack}>
          <XCircle color="#00ccbb" height={35} width={35} />
        </TouchableOpacity>
      </View>
      <View style={styles.basketScreen__middle}>
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
            backgroundColor: "lightgray",
          }}
        />
        <Text style={{ flex: 1 }}>Deliver in 30-45 minutes</Text>
        <Text style={{ color: "#00ccbb", fontSize: 14 }}>Change</Text>
      </View>
      <ScrollView
        style={{
          marginTop: 20,
          overflowY: "auto",
          height: "40%",
          marginBottom: 20,
        }}
      >
        {Object.entries(getBasketIetms).map(([id, items]) => {
          const dish = items[0];
          return (
            <View
              key={id}
              style={{
                padding: 20,
                backgroundColor: "#fff",
                borderBottomColor: "#f5f5f5",
                borderBottomWidth: 0.6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Text style={{ color: "#00ccbb" }}>{items.length} x</Text>
                  <Image
                    source={{
                      uri: urlFor(dish.image).url(),
                    }}
                    style={{ height: 50, width: 50, borderRadius: 999 }}
                  />
                  <Text style={{ fontWeight: "600", fontSize: 16, flex: 1 }}>
                    {dish.name}
                  </Text>
                  <Text>
                    <Currency
                      quantity={dish.price * items.length}
                      currency="INR"
                    />
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{ color: "#00ccbb" }}
                      onPress={() => dispatch(removeFromBasket({ id: id }))}
                    >
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.basketScreen__bottom}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: "gray" }}>Subtotal</Text>
          <Text style={{ color: "gray" }}>
            <Currency quantity={total} currency="INR" />
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: "gray" }}>Delivery Fee</Text>
          <Text style={{ color: "gray" }}>
            <Currency quantity={30} currency="INR" />
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Order Total</Text>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            <Currency quantity={total + 30} currency="INR" />
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("PreparingOrderScreen")}
          style={styles.placeOrder__button}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17, color: "white" }}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  basketScreen__top: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomColor: "#00ccbb",
    borderBottomWidth: 0.6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.5,
  },
  basketScreen__middle: {
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
  },
  basketScreen__bottom: {
    paddingBottom: 50,
    backgroundColor: "#fff",
    padding: 20,
    borderTopColor: "#f5f5f5",
    borderTopWidth: 0.6,
  },
  placeOrder__button: {
    backgroundColor: "#00ccbb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
});
export default BasketScreen;
