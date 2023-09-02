import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { Star, MapPin } from "@nandorojo/heroicons/24/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
const RestuarantCards = ({
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
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.rest__card}
      onPress={() =>
        navigation.navigate("Restaurant", {
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
      }
    >
      <Image source={{ uri: urlFor(image).url() }} style={styles.card__image} />
      <View style={styles.card__top}>
        <Text style={{ paddingTop: 5, fontWeight: "bold", fontSize: 17 }}>
          {title}
        </Text>
        <View style={styles.card__middle}>
          <Star color="#00CCBB" opacity={0.7} size={22} />
          <Text
            style={{
              flexDirection: "row",
              alignItems: "center",
              color: "gray",
            }}
          >
            <Text style={{ color: "#00ccbb" }}>{rating}</Text> · {genre}
          </Text>
        </View>
        <View style={styles.card__bottom}>
          <MapPin color="gray" />
          <Text style={{ color: "gray", fontSize: 13 }}>Nearby · {addr}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  rest__card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 20,
    width: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopEndRadius: 10,
    cursor: "pointer",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  card__top: {
    padding: 10,
  },
  card__image: {
    width: 250,
    height: 150,
  },
  card__middle: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  card__bottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
});
export default RestuarantCards;
