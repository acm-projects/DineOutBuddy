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
import { accentClick, inputColor, lavenderColor } from "./ComponentColors";

const GroupCard = ({ chat }) => {
  // console.log(chat);

  const convertTime = (createdAt) => {
    var date = new Date(createdAt);
    return ((date.getHours() + 24) % 12 || 12) + ":" + date.getMinutes();
  };
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
            {chat.latestMessage ? (
              <Text style={styles.time}>
                {convertTime(chat.latestMessage.createdAt)}
              </Text>
            ) : null}
          </View>
          {chat.latestMessage ? (
            <Text style={styles.message}>
              {chat.latestMessage.sender.username}: {chat.latestMessage.content}
            </Text>
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
    borderTopWidth: 1,
    borderTopColor: "#CFD6EF",
    borderBottomWidth: 1,
    borderBottomColor: "#CFD6EF",
    paddingVertical: 10,
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
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  imgContainer: {
    elevation: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: "black",
  },
  name: {
    fontSize: 15,
    fontFamily: "Metropolis-SemiBold",
  },
  message: {
    fontSize: 14,
    color: lavenderColor,
    fontFamily: "Metropolis-Medium",
  },
  time: {
    fontSize: 14,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
});
