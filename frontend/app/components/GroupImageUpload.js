import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import client from "../api/client";
import { useLogin } from "../../context/LoginProvider";

const GroupImageUpload = ({ chat }) => {
  const { profile } = useLogin();
  const [profileImage, setProfileImage] = useState("");

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status != "granted") {
      alert("Sorry, we need camera roll permission");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.canceled) {
        setProfileImage(response.assets[0].uri);
      }
    }
  };

  const GroupImageUpload = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });

    try {
      const res = await client.post(
        "/api/chat/upload-profile",
        { formData: formData, chat: chat },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            authorization: `JWT ${profile.token}`,
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={openImageLibrary} style={styles.uploadBtn}>
          <Image
            source={{ uri: chat.avatar }}
            style={{ width: "100%", height: "100%", backgroundColor: "white" }}
          />
        </TouchableOpacity>

        {profileImage && (
          <Text
            style={{
              textAlign: "center",
              padding: 10,
              fontSize: 16,
              fontWeight: "bold",
              letterSpacing: 1,
              opacity: 0.5,
              backgroundColor: "green",
              color: "white",
              borderRadius: 8,
            }}
            onPress={GroupImageUpload}
          >
            Upload
          </Text>
        )}
      </View>
    </View>
  );
};

export default GroupImageUpload;

const styles = StyleSheet.create({
  uploadBtn: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 13,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
