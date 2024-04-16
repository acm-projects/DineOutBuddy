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

const UserCard = ({ user }) => {
  // console.log(chat);
  const navigation = useNavigation();
  return (
    <View style={styles.groupCard}>
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={{ uri: user.avatar }} />
      </View>
      <View style={styles.text}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{user.fullname}</Text>
          <Text style={styles.time}>{user.username}</Text>
        </View>
        {}
      </View>
    </View>
  );
};

export default UserCard;

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
    flexDirection: "column",
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
    color: "black",
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
