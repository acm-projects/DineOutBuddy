import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const GroupCard = ({ chat }) => {
  // console.log(chat);
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ChatScreen", {
          chat: chat,
        });
      }}
    >
      <View style={styles.groupCard}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/users/user-1.jpg")}
          />
        </View>
        <View style={styles.text}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{chat.chatName}</Text>
            <Text style={styles.time}>8:34</Text>
          </View>
          {chat.latestMessage ? (
            <Text style={styles.message}>{chat.latestMessage.content}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  groupCard: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    paddingHorizontal: 23,
  },
  text: {
    marginLeft: 18,
    flex: 1,
  },
  cardHeader: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  imgContainer: {
    elevation: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: "black",
  },
  name: {
    color: "#2287D0",
    fontSize: 15,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
  },
  time: {
    fontSize: 14,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
});
