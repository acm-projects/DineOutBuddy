import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import RestaurantCard from "../components/RestaurantCard";
import { useLogin } from "../../context/LoginProvider";

import BottomSheet, { BottomSheetModalProvider, BottomSheetView, TouchableHighlight, TouchableOpacity } from '@gorhom/bottom-sheet';
import BottomSheetModal from '@gorhom/bottom-sheet';
//import { NativeViewGestureHandler } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchModalMain from "../components/SearchModalMain";
import SearchModalGroup from "../components/SearchModalGroup";
import { accentColor, darkColor, primaryColor } from "../components/ComponentColors";

const Stack = createNativeStackNavigator();
const SearchScreen = ({ navigation }) => {

  const [clickOut, setClickOut] = useState(false);
  
  // ref
  const bottomSheetModalRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("binkbonk: " + index);
    setClickOut(!clickOut);
  }, [clickOut]);

  const openModal = useCallback(() => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.collapse();
    }
  }, []);
  
  const closeModal = useCallback(() => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.close();
    }
    console.log("dnoqiwnwqo");
  }, []);

  const { coordinates } = useLogin();
  console.log(coordinates.longitude);
  console.log(coordinates.latitude);
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
          `http://10.176.215.167:8000/restaurantsByDiet?lat=${
            coordinates.latitude
          }&lng=${coordinates.longitude}&restrictions=${"chicken"}`
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
    <BottomSheetModalProvider>
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
          <TouchableOpacity onPress={!clickOut ? openModal : closeModal}>
            <View style={styles.filterContainer}>
              <Icon name={"filter"} size={30} color={darkColor} />
            </View>
          </TouchableOpacity>
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
      <BottomSheetModal
        index = {-1}
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={['80%']}
        enablePanDownToClose = {true}
        backgroundStyle={{backgroundColor: primaryColor}}
        style={{shadowColor: "#000", elevation: 20, borderColor: "black"}}
        handleIndicatorStyle={{backgroundColor: "#9DA7CD"}}
      >
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* TODO: Make the stack return to SearchModalMain after the modal is closed to get rid of the navigate loop */}
          <Stack.Screen
            name="SearchModalMain"
            component={SearchModalMain}
            returnFunc={this.closeModal}
          />
          <Stack.Screen
              name="SearchModalGroup"
              component={SearchModalGroup}
          />
        </Stack.Navigator>
      </BottomSheetModal>
    </BottomSheetModalProvider>
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
    gap: 10
  },
  filterContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
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
