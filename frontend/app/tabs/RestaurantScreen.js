import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import FoodCard from "../components/FoodCard";
import RestaurantCard from "../components/RestaurantCard";
import ReviewCard from "../components/ReviewCard";
import Tag from "../components/Tag";

const RestaurantScreen = ({ route }) => {
  const { data } = route.params;
  const [rating, setRating] = useState(data.rating);
  const [reviews, setReviews] = useState([]);
  const [recommendedMenuItems, setRecommendedMenuItems] = useState([]);
  // console.log(data);

  useEffect(() => {
    console.log(data);
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://IPADDRESS:8000/restaurantDetails?placeId=${data.place_id}`
        );
        const json = await response.json();
        setReviews(json.result.reviews || []);
        console.log(json.result.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRecommendedMenuItems = async () => {
      try {
        const response = await fetch(
          `http://IPADDRESS:8000/aichatfilter?message=${
            "allergies: peanut, " + data.menuString
          }`
        );
        console.log(data.menuString + "HISSSS");
        const json = await response.json();
        console.log(json.response + "  test3");
        const recommendedItemsStrings = JSON.parse(json.response);
        console.log(recommendedItemsStrings + "  ");

        const recommendedItems = recommendedItemsStrings.map((itemString) => {
          const parts = itemString.split(", $");
          const name = parts[0];
          const price = "" + parts[1] + " USD";
          return { name, price };
        });

        console.log(recommendedItems);
        setRecommendedMenuItems(recommendedItems);
      } catch (error) {
        console.error("Error fetching recommended menu items:", error);
      }
    };

    fetchReviews();
    fetchRecommendedMenuItems();
  }, [data.place_id]);

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
    data.photo +
    "&key=AIzaSyDlu9r4NNFvcpgeb1ggv4BK0HyYEh5cl-c";
  console.log(data.name);
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
          {[...Array(data.category.length)].map((star, i) => {
            return <Tag content={data.category[i]} key={i} />;
          })}
        </View>
      </ImageBackground>
      <View style={styles.main}>
        <Text style={styles.subHeading}>Recommended Menu Items</Text>
        <View style={styles.cardWrapper}>
          {recommendedMenuItems.map((menuItem, index) => (
            <FoodCard key={index} item={menuItem} />
          ))}
        </View>
        <Text style={styles.subHeading}>All Menu Items</Text>
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
                <Icon
                  name={"star"}
                  color={currentValue <= rating ? "#0093ED" : "black"}
                  key={i}
                  size={15}
                />
              );
            })}
          </View>
          <Text style={styles.reviewCount}>| 643 Reviews</Text>
        </View>

        <View style={styles.reviewWrapper}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} reviewData={review} />
          ))}
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
