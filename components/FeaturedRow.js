import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRight } from "@nandorojo/heroicons/24/outline";
import { StyleSheet } from "react-native";
import RestuarantCards from "./RestuarantCards";
import { useEffect } from "react";
import client from "../sanity";
import { useState } from "react";
const FeaturedRow = ({ id, title, desc }) => {
  const [restuarants, setRestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
      *[_type=="featured" && _id ==  $id]{
        ...,
        restuarants[]->{
          ...,
          dishses[]->,
          type->{
            name
          }
        },
      }[0]
      
      `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restuarants);
      });
  }, []);
  //console.log("restaurants: ", restuarants);
  return (
    <View style={{ marginLeft: -10 }}>
      <View style={styles.features__top}>
        <Text style={{ fontWeight: "bold", fontSize: "20px" }}>{title}</Text>
        <ArrowRight color="#00CCBB" />
      </View>
      <Text style={styles.featured__desc}>{desc}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={{ padding: 15 }}
      >
        {restuarants?.map((restuarant) => (
          <RestuarantCards
            id={restuarant._id}
            key={restuarant._id}
            image={restuarant?.image}
            title={restuarant?.name}
            rating={restuarant?.rating}
            genre={restuarant?.type?.name}
            addr={restuarant?.address}
            shortDesc={restuarant?.short_description}
            dishes={restuarant?.dishses}
            long={restuarant?.location?.long}
            lat={restuarant?.location?.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  features__top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  featured__desc: {
    marginTop: -8,
    color: "gray",
    marginHorizontal: 30,
  },
});
export default FeaturedRow;
