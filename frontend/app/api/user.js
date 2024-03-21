import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "./client";

export const signIn = async (username, password) => {
  try {
    const signInRes = await client.post("api/user/sign-in", {
      username,
      password,
    });

    if (signInRes.data.success) {
      const token = signInRes.data.token;
      await AsyncStorage.setItem("token", token);
      return signInRes;
    }
  } catch (error) {
    console.log("error inside signin method.", error.message);
  }
};
