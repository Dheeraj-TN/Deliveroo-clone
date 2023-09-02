import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { ChevronRight } from "@nandorojo/heroicons/20/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
import { removeFromBasket, selectBasketItems } from "../features/basketSlice";
const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setEmpty = useSelector(selectBasketItems);
  const {
    params: {
      id,
      image,
      title,
      rating,
      genre,
      addr,
      shortDesc,
      dishes,
      long,
      lat,
    },
  } = useRoute();
  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        image,
        title,
        rating,
        genre,
        addr,
        shortDesc,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View style={styles.restaurantScreen__top}>
          <Image
            source={{
              uri: urlFor(image).url(),
            }}
            style={styles.restaurantScreen__image__top}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 60,
              left: 20,
              backgroundColor: "whitesmoke",
              padding: 5,
              borderRadius: 100,
            }}
            onPress={() => {
              navigation.goBack();
              setEmpty.forEach((item) => {
                dispatch(
                  removeFromBasket({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    desc: item.desc,
                    image: item.image,
                  })
                );
              });
            }}
          >
            <ArrowLeftIcon color="#00CCBB" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.restaurant__details}>
          <View style={{ padding: 20 }}>
            <Text style={styles.restaurant__title}>{title}</Text>
            <View style={styles.restaurant__details__top}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <StarIcon color="#00CCBB" />
                <Text style={{ fontSize: 14 }}>
                  {rating} · {genre}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MapPinIcon color="gray" />
                <Text style={{ color: "gray", fontSize: 14 }}>
                  Nearby · {addr}
                </Text>
              </View>
            </View>
            <Text style={{ marginTop: 10, paddingLeft: 5, color: "gray" }}>
              {shortDesc}
            </Text>
          </View>
          <TouchableOpacity style={styles.restaurantScreen__details__bottom}>
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                flex: 1,
                paddingLeft: 10,
              }}
            >
              Have a food allergy?
            </Text>
            <ChevronRight color="#00ccbb" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 120 }}>
          <Text style={styles.restaurant__menuText}>Menu</Text>
          {/* dishrow */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              price={dish.price}
              desc={dish.short_description}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  restaurantScreen__top: {
    position: "relative",
  },
  restaurantScreen__image__top: {
    width: "100%",
    height: 230,
  },
  restaurant__details: {
    backgroundColor: "#fff",
  },
  restaurant__title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  restaurant__details__top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 10,
  },
  restaurantScreen__details__bottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: 20,
    borderBlockColor: "#f5f5f5",
    borderTopWidth: 1,
  },
  restaurant__menuText: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
    paddingLeft: 20,
  },
});
export default RestaurantScreen;
