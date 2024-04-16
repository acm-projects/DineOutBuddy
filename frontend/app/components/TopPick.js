import React from "react";
import {
  View,
  Pressable,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import fish from "../../assets/fish.png";
import restaurantPic from "../../assets/restaurantPic.png";
import { darkColor, lavenderColor, primaryColor, secondaryColor } from "./ComponentColors";
import { useNavigation } from "@react-navigation/native";

export default function TopPick(props) {
  const navigation = useNavigation();
  const name = "Osaka Sushi Hibachi & Grill";
  const rating = 4.5;
  const numReviews = 683;
  const DOLLADOLLABILL = "$$";

  const handlePress = () => {
    console.log("hello to whoever integrates this 😎");
    navigation.navigate("OsakaRestaurantScreen");
  };

  return (
    <View style={{ borderRadius: 20, overflow: "hidden" }}>
      <TouchableOpacity onPress={handlePress}>
        <ImageBackground style={styles.card} source={restaurantPic}>
          <View style={styles.cardFooter}>
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.subtitleText}>
              {rating} {numReviews} | {DOLLADOLLABILL}{" "}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 20,
		width: Dimensions.get("window").width - 96, // -96 bc 48*2 = 96, and 48 is basically the horizontal margin for these views
		aspectRatio: 1.5,
		flexDirection: "column-reverse"
	},
	cardFooter: {
		backgroundColor: primaryColor,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderBottomWidth: 2,
		borderColor: secondaryColor,
		paddingHorizontal: 20
	},
	titleText: {
		fontFamily: "Metropolis-Bold",
		fontSize: 20,
		color: darkColor
	},
	subtitleText: {
		fontFamily: "Metropolis-SemiBold",
		fontSize: 16,
		color: lavenderColor
	}
});
