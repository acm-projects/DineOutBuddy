import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ImageBackgroundBase,
  ImageBackground,
  Dimensions,
} from "react-native";
import ForYou from "../components/ForYou";
import { useLogin } from "../../context/LoginProvider";
import Icon from "react-native-vector-icons/Ionicons";
import {
  accentColor,
  darkColor,
  primaryColor,
  secondaryColor,
} from "../components/ComponentColors";
import TopPick from "../components/TopPick";
import fish from "../../assets/fish.png";
import {
  AmericanRestaurants,
  ItalianRestaurans,
  JapaneseResturant,
  MexicanRestaurans,
  IndianRestaurans,
  ThaiRestaurans,
} from "../../data.js/Restaurantinfo";
import RestaurantHomeWrapper from "../components/RestaurantHomeWrapper";

export default function Home({ navigation }) {
  const { chats, fetchChats, coordinates } = useLogin();
  const [restaurants, setRestaurants] = useState([
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
    },]);

  useEffect(() => {
    fetchChats();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log(coordinates);
      const response = await fetch(
        `http://10.176.217.84:8000/matchedRestaurants?lat=${
          "32.7767"
        }&lng=${"-96.7970"}&restrictions=${"Japanese"}`
      );

      const data = await response.json();
      console.log(data);
      setRestaurants(data); // Assuming 'data' is the array of restaurants
    } catch (error) {
      console.log(error);
      console.log("Error in search");
    }
  };

  const topPickScrollLength = Dimensions.get("window").width - 96 + 22; // -96 for horizontal padding, +22 for the gap between items
  const [topPickScrollIndex, setTopScrollIndex] = useState(0);
  const topPickRef = useRef(null);

  const handleClick = (type) => {
    console.log("Clicked", type);
    // Assuming you're using React Navigation and have passed the `navigation` prop correctly:
    // navigation.navigate('Restaurant');
  };

  const handleTopPickLeftScroll = () => {
    setTopScrollIndex(topPickScrollIndex - topPickScrollLength);
    topPickRef.current.scrollTo({ x: topPickScrollIndex, animated: true });
  };

  const handleTopPickRightScroll = () => {
    setTopScrollIndex(topPickScrollIndex + topPickScrollLength);
    topPickRef.current.scrollTo({ x: topPickScrollIndex, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={{ gap: 8 }}
          nestedScrollEnabled={true}
        >
          <View
            style={{
              gap: 15,
              paddingVertical: 20,
              backgroundColor: primaryColor,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}
          >
            <Text style={styles.header}>Top Picks in Your Area</Text>

            <View style={styles.topPickContainer}>
              <TouchableOpacity onPress={handleTopPickLeftScroll}>
                <Icon name="chevron-back" size={30} color={darkColor} />
              </TouchableOpacity>
              <View style={{ flex: 1, borderRadius: 20 }}>
                <ScrollView
                  contentContainerStyle={{ gap: 22 }}
                  horizontal={true}
                  ref={topPickRef}
                  snapToInterval={topPickScrollLength}
                  showsHorizontalScrollIndicator={false}
                >
                  <TopPick />
                  <TopPick />
                  <TopPick />
                  <TopPick />
                  <TopPick />
                </ScrollView>
              </View>
              <TouchableOpacity onPress={handleTopPickRightScroll}>
                <Icon name="chevron-forward" size={30} color={darkColor} />
              </TouchableOpacity>
            </View>
          </View>

        {chats.map((chat, index) => {
          return (
            <ForYou key={chat._id} chat={chat} restaurants={restaurants} />
          );
        })}

        <RestaurantHomeWrapper category={AmericanRestaurants} />
        <RestaurantHomeWrapper category={ItalianRestaurans} />
        <RestaurantHomeWrapper category={JapaneseResturant} />
        <RestaurantHomeWrapper category={MexicanRestaurans} />
        <RestaurantHomeWrapper category={IndianRestaurans} />
        <RestaurantHomeWrapper category={ThaiRestaurans} />
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: accentColor,
    paddingTop: 50,
  },
  contentContainer: {
    backgroundColor: secondaryColor,
    height: Dimensions.get("window").height,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: "hidden"
  },
  topPickContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    gap: 10,
  },
  header: {
    fontSize: 32,
    fontFamily: "Metropolis-Black",
    color: accentColor,
    paddingHorizontal: 32,
    //    width: "80%"
  },
});
