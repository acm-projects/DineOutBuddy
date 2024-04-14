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
import React, { useState, useEffect, useRef, useContext } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import RestaurantCard from "../components/RestaurantCard";
import { useLogin } from "../../context/LoginProvider";
import SearchModal from "../components/SearchModal";
import { GlobalContext } from "../../context";
import AppLoader from "../components/AppLoader";

const SearchScreen = ({ navigation }) => {
  const { coordinates, profile } = useLogin();
  const [allergies, setAllergies] = useState(profile.allergies);
  const [preferences, setPreferences] = useState(profile.preferences);
  const [cravings, setCravings] = useState(profile.cravings);

  const handleChange = (type, option) => {
    if (type == "allergy") {
      if (!allergies.includes(option)) {
        setAllergies((prev) => [...prev, option]);
      } else {
        setAllergies(allergies.filter((a) => a != option));
      }
    }
    if (type == "preference") {
      if (!preferences.includes(option)) {
        setPreferences((prev) => [...prev, option]);
      } else {
        setPreferences(preferences.filter((a) => a != option));
      }
    } else if (type == "craving") {
      if (!cravings.includes(option)) {
        setCravings((prev) => [...prev, option]);
      } else {
        setCravings(cravings.filter((a) => a != option));
      }
    }
  };

  const handleGroupChange = (group) => {
    setAllergies(group.allergies);
    setPreferences(group.preferences);
    setCravings(group.cravings);
  };

  const INITIAL_REGION = {
    latitude: 32.985105,
    longitude: -96.7494417,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  const mapRef = useRef();

  const onMarkerSelected = (restaurant) => {
    console.log(restaurant.name);
  };

  const { modalVisible, setModalVisible } = useContext(GlobalContext);
  const [restaurants, setRestaurants] = useState([]); // Step 1: State to hold restaurant data
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const preferenceString = preferences.join(" and ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(coordinates);
        const response = await fetch(
          `http://10.176.219.164:8000/matchedRestaurants?lat=${
            coordinates.latitude
          }&lng=${coordinates.longitude}&restrictions=${"Japanese"}`
        );
        //http://localhost:8000/matchedRestaurants?lat=32.7767&lng=-96.7970&restrictions=chicken

        const data = await response.json();
        console.log(data);
        setLoading(false);
        setRestaurants(data); // Assuming 'data' is the array of restaurants
      } catch (error) {
        console.log(error);
        console.log("Error in search");
      }
    };
    fetchData();
  }, []); // Fetch data when component mounts

  return (
    <>
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
          <Pressable onPress={() => setModalVisible(true)}>
            <Icon name={"cog"} size={25}></Icon>
          </Pressable>
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
                  longitude: 32,
                  latitude: -96,
                  longitude: restaurant.lng,
                  latitude: restaurant.lat,
                }}
                onPress={() => onMarkerSelected(restaurant)}
              >
                <Image
                  source={require("../../assets/marker.png")}
                  style={{ height: 60, width: 60 }}
                />
                <Callout>
                  <View>
                    <Text>{restaurant.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
        <ScrollView style={styles.cardWrapper}>
          {loading && <AppLoader />}
          {restaurants
            .filter((restaurant) => {
              return search.toLowerCase() === ""
                ? restaurant
                : restaurant.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((restaurant, index) => (
              <RestaurantCard
                key={index}
                data={restaurant}
                navigation={navigation}
              />
            ))}
        </ScrollView>
        {modalVisible && (
          <SearchModal
            allergies={allergies}
            preferences={preferences}
            cravings={cravings}
            handleChange={handleChange}
            handleGroupChange={handleGroupChange}
          />
        )}
      </View>
    </>
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
    padding: 8,
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
