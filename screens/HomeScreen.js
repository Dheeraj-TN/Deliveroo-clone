import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import client from "../sanity";
import {
  UserIcon,
  ChevronDownIcon,
  AdjustmentsIcon,
  SearchIcon,
} from "react-native-heroicons/outline";
import {
  MagnifyingGlass,
  AdjustmentsHorizontal,
} from "@nandorojo/heroicons/24/outline";
import { SearchBar } from "react-native-screens";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategroies] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    client
      .fetch(
        `
    *[_type=="featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }
    `
      )
      .then((data) => {
        setFeaturedCategroies(data);
      });
  }, []);
  // console.log(featuredCategories);
  //console.log("ctaregories:", featuredCategories);
  return (
    <>
      <SafeAreaView style={styles.homePage}>
        {/* header compoenent */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image
              source={{
                uri: "https://links.papareact.com/wru",
              }}
              style={styles.headerImage}
            />
            <View style={styles.header__left__text}>
              <Text style={styles.text1}>Deliver Now</Text>
              <Text style={styles.text2}>
                Current Location
                <ChevronDownIcon size={20} color="#00CCBB" />
              </Text>
            </View>
            <UserIcon size={35} color="#00CCBB" />
          </View>
          {/* search bar */}
          <View style={styles.searchRow}>
            <View style={styles.searchRow__left}>
              <MagnifyingGlass size={20} color="gray" />
              <TextInput
                placeholder="Search Restuarnats and cusines..."
                style={styles.SearchBar}
                keyboardType="default"
              />
            </View>
            <AdjustmentsHorizontal size={35} color="#00CCBB" />
          </View>
        </View>

        {/* body */}
      </SafeAreaView>
      <ScrollView style={styles.categories}>
        {/* categories */}
        <Categories />
        {/* featured row */}
        {featuredCategories?.map((categories) => (
          <FeaturedRow
            id={categories._id}
            key={categories._id}
            title={categories.name}
            desc={categories.short_description}
            restaurants={categories.restaurants}
          />
        ))}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  homePage: {
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
  headerImage: {
    height: 40,
    width: 40,
    backgroundColor: "gray",
    borderRadius: 999,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header__left__text: {
    flex: 1,
  },
  text1: {
    color: "gray",
    fontWeight: 400,
  },
  text2: {
    fontWeight: "bold",
    fontSize: 19,
    flexDirection: "row",
    alignItems: "center",
  },
  searchRow: {
    marginBottom: 0,
    paddingBottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingHorizontal: 20,
    gap: 10,
  },
  searchRow__left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 3,
    paddingHorizontal: 7,
    borderRadius: 10,
  },
  SearchBar: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    padding: 10,
    color: "black",
  },
  categories: {
    backgroundColor: "#f5f5f5",
    paddingBottom: 150,
    marginTop: -30,
    paddingTop: 10,
  },
});
export default HomeScreen;
