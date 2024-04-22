import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import FoodCard from "../components/FoodCard";
import RestaurantCard from "../components/RestaurantCard";
import ReviewCard from "../components/ReviewCard";
import Tag from "../components/Tag";
import FeatherIcon from "react-native-vector-icons/Feather";
import { accentColor, primaryColor } from "../components/ComponentColors";

const OsakaRestaurantScreen = ({ route, navigation }) => {
  const [rating, setRating] = useState(4.5);
  const [seeReviews, setSeeReviews] = useState(2);
  const [seeMenu, setSeeMenu] = useState(3);

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
    "ATplDJZwy4zCYSq6BHUll8XO1j2zE3vs-VL0K4zYWNqz3XmQmj8m7DH4wrTzQ5kIZEacKQmzC_JW0MMK7PxJMaauvvWNVh66M1VdLGrpV-yR4Ypiyq0e-n_KRYcOlpOiuqZ5OH-ze_KUXUS_gDWXLB8TgRjMveP7TxDeulpajdrTvM-OYSTh" +
    "&key=AIzaSyDlu9r4NNFvcpgeb1ggv4BK0HyYEh5cl-c";

  const data = {
    name: "Osaka Hibachi Sushi & Bar",
    category: ["Sushi", "Family Friendly", "Seafood"],
    rating: 4.5,
    user_ratings_total: 681,
    price_level: 2,
  };

  const recommendedMenuItems = [
    {
      name: "Crispy Salmon Roll",
      price: "12.95",
      tags: ["Salmon", "Deep Fried", "Cheese", "Avocado"],
      uri: require("../../assets/food/CrispySalmonRoll.png"),
    },
    {
      name: "Super Chy Chy Roll",
      price: "14.95",
      tags: ["Deep Fried", "Spicy Tuna", "Avocado", "Spicy Kani"],
      uri: require("../../assets/food/SuperChyChyRoll.png"),
    },
    {
      name: "Las Vegas Roll",
      price: "15.95",
      tags: ["Deep Fried", "Crabmeat", "Avocado"],
      uri: require("../../assets/food/LasVegasRoll.png"),
    },
    {
      name: "Chase Tiger Roll",
      price: "20.95",
      tags: ["Raw", "Lobster", "Eel Tempura", "King Crab"],
      uri: require("../../assets/food/ChaseTigerRoll.png"),
    },
    {
      name: "Black Dragon Roll",
      price: "16.95",
      tags: ["Cooked", "Shrimp Tempura", "Eel"],
      uri: require("../../assets/food/BlackDragonRoll.png"),
    },
    {
      name: "Sakura Roll",
      price: "16.95",
      tags: ["Kani", "Cheese", "Avocado"],
      uri: require("../../assets/food/SakuraRoll.png"),
    },
    {
      name: "Sweet Heart Roll",
      price: "15.95",
      tags: ["Tuna", "Avocado", "Spicy Mayo"],
      uri: require("../../assets/food/SweetHeartRoll.png"),
    },
    {
      name: "Lobster Fantasy Roll",
      price: "18.95",
      tags: ["Tempura Lobster", "Crabmeat", "Avocado"],
      uri: require("../../assets/food/LobsterFantasyRoll.png"),
    },
    {
      name: "Phoenix Roll",
      price: "15.95",
      tags: ["Shrimp Tempura", "Avocado", "Spicy Tuna"],
      uri: require("../../assets/food/PhoenixRoll.png"),
    },
    {
      name: "DFW Roll",
      price: "14.95",
      tags: ["Spicy Salmon", "Cucumber", "Avocado", "Pepper Tuna"],
      uri: require("../../assets/food/DFWRoll.png"),
    },
    {
      name: "Ichiban Roll",
      price: "18.95",
      tags: ["Tempura Salmon", "Tuna", "Salmon", "Avocado"],
      uri: require("../../assets/food/IchibanRoll.png"),
    },
  ];

  const menuItems = [
    {
      name: "Chase Tiger Roll",
      price: "20.95",
      tags: ["Raw", "Lobster", "Eel Tempura", "King Crab"],
      uri: require("../../assets/food/ChaseTigerRoll.png"),
    },
    {
      name: "Black Dragon Roll",
      price: "16.95",
      tags: ["Cooked", "Shrimp Tempura", "Eel"],
      uri: require("../../assets/food/BlackDragonRoll.png"),
    },
    {
      name: "Sakura Roll",
      price: "16.95",
      tags: ["Kani", "Cheese", "Avocado"],
      uri: require("../../assets/food/SakuraRoll.png"),
    },
    {
      name: "Sweet Heart Roll",
      price: "15.95",
      tags: ["Tuna", "Avocado", "Spicy Mayo"],
      uri: require("../../assets/food/SweetHeartRoll.png"),
    },
    {
      name: "Lobster Fantasy Roll",
      price: "18.95",
      tags: ["Tempura Lobster", "Crabmeat", "Avocado"],
      uri: require("../../assets/food/LobsterFantasyRoll.png"),
    },
    {
      name: "Phoenix Roll",
      price: "15.95",
      tags: ["Shrimp Tempura", "Avocado", "Spicy Tuna"],
      uri: require("../../assets/food/PhoenixRoll.png"),
    },
    {
      name: "DFW Roll",
      price: "14.95",
      tags: ["Spicy Salmon", "Cucumber", "Avocado", "Pepper Tuna"],
      uri: require("../../assets/food/DFWRoll.png"),
    },
    {
      name: "Ichiban Roll",
      price: "18.95",
      tags: ["Tempura Salmon", "Tuna", "Salmon", "Avocado"],
      uri: require("../../assets/food/IchibanRoll.png"),
    },

    ,
  ];

  const reviews = [
    {
      author_name: "Kyla Dawson",
      author_url:
        "https://www.google.com/maps/contrib/114587190807554831008/reviews",
      language: "en",
      original_language: "en",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjXF0WRvJugp0VFl57vRhBDX05k0WGKk_gtcur0WU-zHrhCRN8w=s128-c0x00000000-cc-rp-mo-ba4",
      rating: 5,
      relative_time_description: "a month ago",
      text: "This is the best shrimp I’ve had in a loooong time. Nice and fresh flavor. The feed snapper was tasty and clean! Fried rice on point. Veggies crisp and seasoned well. The clear soup is delicious!",
      time: 1709944568,
      translated: false,
    },
    {
      author_name: "Ashley S",
      author_url:
        "https://www.google.com/maps/contrib/103518789083628341645/reviews",
      language: "en",
      original_language: "en",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjW4Lr53H2NQWQtaefdU7XiRbgedQABbWZPh6XhBqvkHUDUV5KWr=s128-c0x00000000-cc-rp-mo-ba5",
      rating: 5,
      relative_time_description: "a month ago",
      text: "Came here with my coworker for lunch and despite sitting down for the hibachi experience it was fairly quick which is good for a business lunch! The customer service from the waitress was spot on and efficient.I ordered the hibachi scallops and chicken which came with miso soup, house salad (ginger dressing), and fried rice (an upcharge). The meal was delicious and cooked nicely. The Chef made the meal fun although it was only 4 of us. I also ordered the spicy tuna rolls and enjoyed them.If in the area, I would definitely return to try out the other hibachi meats and sushi!",
      time: 1708042252,
      translated: false,
    },
    {
      author_name: "Walter Wilson",
      author_url:
        "https://www.google.com/maps/contrib/102063711636269227641/reviews",
      language: "en",
      original_language: "en",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/ACg8ocJe4OgRg88Bey4dCQSqXMGzSeOZMstE_LTsGwK9kLc9SaP8rA=s128-c0x00000000-cc-rp-mo",
      rating: 5,
      relative_time_description: "2 months ago",
      text: "Japanese food at its best. This gem is located in an end cap shopping center space in Sachse.I’m a fan of Benihana restaurants.This restaurant is of the same genre.Food , atmosphere, and presentation do not take a backseat in this category.The hibachi chef  performs awesome feats of utensil handling. Sitting in a horseshoe around the grill is exhilarating. Everything on the menu, and I mean everything , is delicious.The shrimp Tempura appetizer is a must. The meals for one and two are good choices to sample different offerings. Sushi is in a class all by itself.The authentic furnishings and decorations make for a Japanese dining experience.Give this restaurant a try and you will agree with my assessment.",
      time: 1707530544,
      translated: false,
    },
    {
      author_name: "chloe beam",
      author_url:
        "https://www.google.com/maps/contrib/102733557879839869542/reviews",
      language: "en",
      original_language: "en",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVMqMjUczbPsvC7CSKsRjOehWsSt67MPrU-ymNit2D6LgpAlCSLsg=s128-c0x00000000-cc-rp-mo",
      rating: 5,
      relative_time_description: "4 weeks ago",
      text: "The food was sooo good and fresh! All of the staff was so kind and attentive! We got the Las Vegas lava role,  the little Sachse roll, a vodka cranberry And the Hibachi chicken with a side of fried rice. (Not pictured). So yummy!",
      time: 1710732531,
      translated: false,
    },
    {
      author_name: "Josh Tovar",
      author_url:
        "https://www.google.com/maps/contrib/101913232411922871255/reviews",
      language: "en",
      original_language: "en",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a-/ALV-UjVgjzrd37GtlYMey6gd28xF1kb_0q_PzqIKN-VNVhx9Q_FdJxpYmg=s128-c0x00000000-cc-rp-mo-ba5",
      rating: 4,
      relative_time_description: "2 months ago",
      text: "The family had lost two of their cubs to a church retreat so we decided to take the little monkey to a Hibachi experience. Mind you he is four and his five star meal is a Happy Meal plus the last time me and my wife ate there, the customer service was horrible since the moment we stepped in the establishment.  Due to the price and prior experience, I didn't want to go, but why not? My little rhino might like it. We walked in and the yound lady was very nice and seated us at the grill. Our server arrived quickly and took our drink orders while providing us with the opportunity to order appetizers. We quickly we knew the little monkey was NOT entertained with the clinging and fire all over. Wife ordered dragon roll and chicken hibachi. I took the steak and chicken hibachi and monkey took the culinary route of chicken nuggets. I was ready for the show and had my credit card credit increased just incase. We were served salad and soup (warm). The roll arrived first then the show. The young man did the cling and clang on the grill. He did the sake volcano and threw broccoli at us like seals at Sea World. At this point, monkey was traumatized by all the fire, we were happy he stayed glued to the iPad. The rolls we ordered as appetizers were good but small. The Hibachi was warm and really no seasoning that made the meal stand out. Well the nuggest must have been brought in from France because monkey ate them up. This was a $105 meal for 3 and water. It's ok to have and happy the bad attitude wasn't there anymore. If you want the show and know the price, go enjoy.",
      time: 1705464004,
      translated: false,
    },
  ];

  const recommendRestaurants = [
    {
      category: ["Sushi", " Chinese", "Asian Fusion"],
      distance: 20.90984372125962,
      id: "48375",
      lat: 32.9791096,
      lng: -96.764983,
      name: "Akaya Sushi, Izakaya & Ramen",
      openNow: "true",
      photo:
        "ATplDJZbt8HgYVazJAYt_kimYday-oPN3I_hge7ndXvwLYbWrrsyGzzNfSl53MK9NQeETAdldqxkSrtM4fti5c7nTwYNm7guBYbtimrYtK8ye7bear1KC4e4_Z3z_ejBJijtGVtBqr7sC7esFQHP64oHuDE1LPOFCDUcPo3En_WX_6q_GGky",
      place_id: "ChIJJwloXPEhTIYRboIzP_nrWi8",
      rating: 4.2,
      user_ratings_total: 546,
      vicinity: "1310 W Campbell Rd #114, Richardson",
    },
    {
      category: [
        "Asian Fusion",
        " Asian",
        " Korean",
        " Vegetarian",
        " Vegetarian Friendly",
        " Vegan Friendly",
        " Vegan",
        " Seafood",
        " Chicken",
        " Family Friendly",
        " Fried Foods",
        " Rolls",
        " Noodles",
        " Soup",
        " Salads",
        " Salads",
        " Desserts",
        " Desserts",
        " Drinks",
        " Rice-bowls",
        " Sushi",
      ],
      distance: 106.87635811250955,
      id: "47187",
      lat: 33.0001559,
      lng: -96.7649374,
      name: "Sayaka Hibachi And Sushi Bar",
      openNow: "true",
      photo:
        "ATplDJaoXE-9at-MRzCa98nNZJzm1mftNBfvCf6SYNPOHqh-YV3RnIK6FUrjICNj-HtyDqKEKl6jq6R0N4JUdMa4Tb0isZXO1zd4pzWnmBz7x4ez5yv2STJLpY38XWweOTNdPx0i-8jCoP8to20JSdumhj3bU-9lcyKt6AHhdI3kVTOWdoHp",
      place_id: "ChIJfWfJJREiTIYRAPqQZC7lp-o",
      price_level: 2,
      rating: 3.9,
      user_ratings_total: 230,
      vicinity: "3801 W President George Bush Hwy, Plano",
    },
    {
      category: [
        "Mediterranean",
        " Greek",
        " Vegetarian",
        " Healthy",
        " Salads",
      ],
      distance: 16.1561009162672,
      id: "48202",
      lat: 32.9773339,
      lng: -96.7673008,
      name: "INO Japanese Bistro",
      openNow: "false",
      photo:
        "ATplDJbFfPTuic40mQCB_RtSaJn0XgHGojtquuOFqpC1sqah18xQJQkm83kOMVmeMhz9hR0oKvy0CxrJOt-152NlfmphYzQpsqTUBlFEj413-Bp48z3EL0khysCGVGl1h1K6OguB-vVbPe5De-h-DFjA7O2m3KRufLGZfotQeh541PKed93r",
      place_id: "ChIJ35bT9_IhTIYRB3ngTe-bGsk",
      price_level: 2,
      rating: 4.6,
      user_ratings_total: 304,
      vicinity: "1920 N Coit Rd #250, Richardson",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: photoUrl }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FeatherIcon name="arrow-left" size={32} color={"white"}/>
          </TouchableOpacity>
          <View style={{height: 20}}/>
          <Text style={styles.title}>{data.name}</Text>
          <View style={styles.info}>
            <Icon name="star" size={12} color={primaryColor} />

            <Text style={styles.infoText}>
              {data.rating} ({data.user_ratings_total}) |{" "}
              {priceLevelToDollarSign(data.price_level)} | 5.6 mi
            </Text>
          </View>
          <View style={{height: 10}}/>
          <View style={styles.tagWrapper}>
            {[...Array(data.category.length)].map((star, i) => {
              return <Tag content={data.category[i]} key={i} />;
            })}
          </View>
        </View>
      </ImageBackground>
      <View style={styles.main}>
        <Text style={styles.subHeading}>Recommended Menu Items</Text>
        <View style={styles.cardWrapper}>
          {recommendedMenuItems.slice(0, seeMenu).map((menuItem, index) => (
            <FoodCard key={index} item={menuItem} />
          ))}
        </View>

        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => {
            if (seeMenu == 3) setSeeMenu(8);
            else setSeeMenu(3);
          }}
        >
          <Text style={styles.menuBtnText}>
            {seeMenu == 8 ? "Show less" : "See Full Menu"}
          </Text>
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
          <Text style={styles.reviewCount}>
            | {data.user_ratings_total} Reviews
          </Text>
        </View>

        <View style={styles.reviewWrapper}>
          {reviews.splice(0, seeReviews).map((review, index) => (
            <ReviewCard key={index} reviewData={review} />
          ))}
        </View>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => {
            if (seeReviews == 2) setSeeReviews(5);
            else setSeeReviews(2);
          }}
        >
          <Text style={styles.menuBtnText}>
            {seeReviews == 5 ? "See less Reviews" : "See more Reviews"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.subHeading}>Restaurants You Might Like</Text>
        <View style={styles.restaurantCardWrapper}>
          {recommendRestaurants.map((res) => {
            return <RestaurantCard data={res} key={res.id} />;
          })}
          {/*<RestaurantCard />
          <RestaurantCard />
          <RestaurantCard /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default OsakaRestaurantScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7FAFD",
    flex: 1,
  },
  header: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  main: {
    flexDirection: "column",
    gap: 5,
    paddingHorizontal: 16,
  },
  subHeading: {
    paddingTop: 20,
    color: accentColor,
    fontSize: 24,
    fontFamily: "Metropolis-ExtraBold",
  },
  title: {
    color: primaryColor,
    fontSize: 38,
    fontFamily: "Metropolis-ExtraBold",
    width: "80%"
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 5,
  },
  infoText: {
    color: primaryColor,
    fontFamily: "Metropolis-Medium",
    fontSize: 16,
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
    gap: 10,
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
