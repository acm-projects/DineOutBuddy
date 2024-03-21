import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../app/api/client";

const LoginContext = createContext();
const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [chats, setChats] = useState([]);

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
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
