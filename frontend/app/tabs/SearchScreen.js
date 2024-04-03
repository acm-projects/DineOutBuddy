import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import RestaurantCard from "../components/RestaurantCard";

const SearchScreen = ({ navigation }) => {
  const INITIAL_REGION = {
    latitude: 32.985105,
    longitude: -96.7494417,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  const mapRef = useRef();

  const focusMap = () => {
    const Stadium = {
      latitude: 44.4220936,
      longitude: -88.083922,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    console.log("Pressed");
    mapRef.current?.animateCamera(
      { center: Stadium, zoom: 10 },
      { duration: 3000 }
    );
  };

  const onMarkerSelected = (restaurant) => {
    console.log(restaurant.name);
  };

  const [restaurants, setRestaurants] = useState([]); // Step 1: State to hold restaurant data
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://10.178.175.126:8000/restaurantsByDiet?lat=${32.99116507104899}&lng=${-96.75371033272737}&restrictions=${"chicken"}`
        );
        const data = await response.json();
        //console.log(data);
        setRestaurants(data); // Assuming 'data' is the array of restaurants
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // Fetch data when component mounts

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() => {
              console.log("pressed");
            }}
            style={styles.searchBtn}
          >
            <View>
              <Icon name="search" size={15} color="white"></Icon>
            </View>
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={"white"}
            onChangeText={(value) => {
              setSearch(value);
            }}
            value={search}
          ></TextInput>
        </View>
        <Icon name={"locate"} size={25}></Icon>
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        ref={mapRef}
      >
        {restaurants
          .filter((restaurant) => {
            return search.toLowerCase() === ""
              ? restaurant
              : restaurant.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((restaurant, index) => (
            <Marker
              key={index}
              coordinate={{
                longitude: restaurant.geometry.location.lng,
                latitude: restaurant.geometry.location.lat,
              }}
              onPress={() => onMarkerSelected(restaurant)}
            >
              <Callout>
                <View>
                  <Text>{restaurant.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <ScrollView style={styles.cardWrapper}>
        {restaurants
          .filter((restaurant) => {
            return search.toLowerCase() === ""
              ? restaurant
              : restaurant.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((restaurant) => (
            <RestaurantCard
              key={restaurant.name}
              data={restaurant}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    gap: 15,
    backgroundColor: "#F7FAFD",
    paddingHorizontal: 16,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  map: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 4,
    paddingHorizontal: 10,
    backgroundColor: "#C4DDEF",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    color: "white",
  },
  input: {
    color: "white",
  },
  cardWrapper: {
    gap: 25,
    flexDirection: "column",
  },
});
