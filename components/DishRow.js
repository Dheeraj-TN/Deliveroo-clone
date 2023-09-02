import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircle, PlusCircle } from "@nandorojo/heroicons/20/solid";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";
const DishRow = ({ id, name, price, desc, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();
  const addItems = () => {
    dispatch(
      addToBasket({
        id,
        name,
        price,
        desc,
        image,
      })
    );
  };
  const removeItems = () => {
    if (!items.length > 0) return;
    dispatch(
      removeFromBasket({
        id,
        name,
        price,
        desc,
        image,
      })
    );
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={[styles.dish__row, isPressed ? styles.pressed : null]}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            {name}
          </Text>
          <Text style={{ color: "gray", marginBottom: 5 }}>{desc}</Text>
          <Text style={{ fontWeight: 600 }}>
            <Currency quantity={price} currency="INR" />
          </Text>
        </View>
        <View>
          <Image
            source={{
              uri: urlFor(image).url(),
            }}
            style={{
              width: 70,
              height: 70,
            }}
          />
        </View>
      </TouchableOpacity>
      {isPressed ? (
        <View style={{ backgroundColor: "#fff", padding: 20 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <TouchableOpacity onPress={removeItems} disabled={!items.length}>
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{items.length}</Text>
            <TouchableOpacity onPress={addItems}>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        ""
      )}
    </>
  );
};
const styles = StyleSheet.create({
  dish__row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    padding: 20,
  },
  pressed: {
    borderBottomWidth: 0,
  },
});
export default DishRow;
