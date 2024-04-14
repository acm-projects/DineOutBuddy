import React, { useRef, useState } from "react";
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
  ThaiRestaurans
} from "../../data.js/Restaurantinfo";
import RestaurantHomeWrapper from "../components/RestaurantHomeWrapper";

export default function Home() {
  const { chats, fetchChats } = useLogin();
  fetchChats();

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
      <ScrollView
        style={styles.contentContainer}
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

        {chats.map((chat, index) => (
          <ForYou key={chat._id} chat={chat} />
        ))}

        <RestaurantHomeWrapper category={AmericanRestaurants}/>
        <RestaurantHomeWrapper category={ItalianRestaurans}/>
        <RestaurantHomeWrapper category={JapaneseResturant}/>
        <RestaurantHomeWrapper category={MexicanRestaurans}/>
        <RestaurantHomeWrapper category={IndianRestaurans}/>
        <RestaurantHomeWrapper category={ThaiRestaurans}/>
        <RestaurantHomeWrapper category={AmericanRestaurants} />
      </ScrollView>
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
