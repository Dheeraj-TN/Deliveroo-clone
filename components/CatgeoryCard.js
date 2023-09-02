import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CatgeoryCard = ({ imageUrl, title }) => {
  return (
    <TouchableOpacity style={styles.catgeory__card}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.catgeoryCard__image}
      />
      <Text style={styles.catgeory__title}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  catgeory__card: {
    position: "relative",
    marginRight: 5,
  },
  catgeoryCard__image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 5,
  },
  catgeory__title: {
    position: "absolute",
    left: 4,
    bottom: 3,
    color: "white",
    fontWeight: "bold",
  },
});
export default CatgeoryCard;
