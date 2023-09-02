import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CatgeoryCard from "./CatgeoryCard";
import client, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
    *[_type=='category']
    `
      )
      .then((data) => {
        setCategories(data);
      });
  });
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 20,
      }}
      style={{ marginTop: -20 }}
    >
      {/* catregory card */}

      <CatgeoryCard
        imageUrl="https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1617156526-min.jpg"
        title="Sushi"
      />
      <CatgeoryCard
        imageUrl="https://images.pexels.com/photos/10201775/pexels-photo-10201775.jpeg?cs=srgb&dl=pexels-amanda-lim-10201775.jpg&fm=jpg"
        title="Thai"
      />
      <CatgeoryCard
        imageUrl="https://e1.pxfuel.com/desktop-wallpaper/746/374/desktop-wallpaper-north-indian-restaurants-in-gurgaon-north-indian-food.jpg"
        title="North Indian"
      />
      <CatgeoryCard
        imageUrl="https://www.spaceotechnologies.com/wp-content/uploads/2018/07/Deliveroo.jpg"
        title="Offers"
      />
      {categories.map((category) => (
        <CatgeoryCard
          id={category._id}
          key={category._id}
          imageUrl={urlFor(category.image).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
