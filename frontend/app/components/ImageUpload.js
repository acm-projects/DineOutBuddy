import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import client from "../api/client";
import { useLogin } from "../../context/LoginProvider";

const ImageUpload = () => {
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

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });

    try {
      const res = await client.post("/api/user/upload-profile", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `JWT ${profile.token}`,
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={openImageLibrary} style={styles.uploadBtn}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                opacity: 0.3,
                fontWeight: "bold",
              }}
            >
              Upload Profile Image
            </Text>
          )}
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 16,
            fontWeight: "bold",
            letterSpacing: 1,
            opacity: 0.5,
          }}
        >
          SKIP
        </Text>
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
            onPress={uploadProfileImage}
          >
            Upload
          </Text>
        )}
      </View>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtn: {
    height: 125,
    width: 125,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
});