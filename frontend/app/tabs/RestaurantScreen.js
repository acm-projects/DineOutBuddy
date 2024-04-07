import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import FoodCard from "../components/FoodCard";
import RestaurantCard from "../components/RestaurantCard";
import ReviewCard from "../components/ReviewCard";

const RestaurantScreen = ({ route }) => {
  const { data } = route.params;
  const [rating, setRating] = useState(data.rating);
  console.log(data);

  const priceLevelToDollarSign = (level) => {
    const levels = {
      1: "$",
      2: "$$",
      3: "$$$",
    };
    return levels[level] || "?";
  };

  let photoUrl =
    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
    data.photos +
    "&key=AIzaSyDlu9r4NNFvcpgeb1ggv4BK0HyYEh5cl-c";
    const menuItems = data.menuItems || [];
  return (
    <ScrollView style={styles.container}>
      <ImageBackground style={styles.header} source={{ uri: photoUrl }}>
        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.info}>
          <Icon name="star" size={10} color={"#A2A6B5"} />

          <Text style={styles.infoText}>
            {data.rating} ({data.user_ratings_total}) |{" "}
            {priceLevelToDollarSign(data.price_level)} | 5.6 mi
          </Text>
        </View>
        <View style={styles.tagWrapper}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{data.category[0]}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{data.category[1]}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{data.category[2]}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.main}>
        <Text style={styles.subHeading}>Reccomended Menu Items</Text>
        <View style={styles.cardWrapper}>
          {menuItems.map((menuItem, index) => (
            <FoodCard key={index} item={menuItem} />
          ))}
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuBtnText}>See Full Menu</Text>
        </TouchableOpacity>
        <Text style={styles.subHeading}>Reviews</Text>
        <View style={styles.reviewHeader}>
          <Text style={styles.review}>{data.rating}</Text>
          <View style={styles.starContainer}>
            {[...Array(5)].map((star, i) => {
              currentValue = i + 1;
              return (
                <>
                  <Icon
                    name={"star"}
                    color={currentValue <= rating ? "#0093ED" : "black"}
                    key={i}
                    size={15}
                  />
                </>
              );
            })}
          </View>
          <Text style={styles.reviewCount}>| 643 Reviews</Text>
        </View>

        <View style={styles.reviewWrapper}>
          <ReviewCard />
          <ReviewCard />
          <View />
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuBtnText}>See more Reviews</Text>
        </TouchableOpacity>

        <Text style={styles.subHeading}>Restaurants You Might Like</Text>
        <View style={styles.restaurantCardWrapper}>
          {/*<RestaurantCard />
          <RestaurantCard />
          <RestaurantCard /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7FAFD",
    flex: 1,
  },
  header: {
    height: 190,
    paddingTop: 100,
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  main: {
    flexDirection: "column",
    gap: 5,
    paddingHorizontal: 16,
  },
  subHeading: {
    color: "#0093ED",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 5,
  },
  infoText: {
    color: "white",
  },
  tagWrapper: {
    flexDirection: "row",
    gap: 6,
  },
  tag: {
    backgroundColor: "#2287D0",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  tagText: {
    color: "white",
    fontSize: 10,
  },
  cardWrapper: {
    gap: 16,
    marginBottom: 20,
  },
  menuBtn: {
    backgroundColor: "#0093ED",
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  menuBtnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  restaurantCardWrapper: {
    gap: 10,
    flexDirection: "column",
  },
  starContainer: {
    flexDirection: "row",
    gap: 2,
  },
  reviewHeader: {
    flexDirection: "row",
    gap: 5,
  },
  review: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0093ED",
  },
  reviewCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  reviewWrapper: {
    gap: 16,
    marginBottom: 20,
  },
});
