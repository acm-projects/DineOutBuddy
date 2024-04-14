import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../app/api/client";
import * as Location from "expo-location";

const LoginContext = createContext();
const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [chats, setChats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({});

  const fetchChats = async () => {
    try {
      const { data } = await client.get("/api/chat", {
        headers: {
          authorization: `JWT ${profile.token}`,
          accept: "application/json",
        },
      });
      setChats(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      try {
        const currLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currLocation.coords;
        console.log(currLocation.coords);
        setCoordinates(currLocation.coords);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("Please grant permission");
    }
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        chats,
        setChats,
        fetchChats,
        modalVisible,
        setModalVisible,
        getLocation,
        coordinates,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
