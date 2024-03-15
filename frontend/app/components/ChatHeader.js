import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome";

const ChatHeader = ({ chat }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name="angle-left" size={30} color={"white"} />
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
          <Image
            style={styles.image}
            source={require("../../assets/users/user-1.jpg")}
          />
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>"Test User"</Text>
            <Text style={styles.onlineStatus}>Online</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => {
              console.log("pressed");
            }}
            style={{ paddingHorizontal: 5 }}
          >
            <Icon name="phone" size={30} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingHorizontal: 20 }}
            onPress={() =>
              navigation.navigate("GroupProfileScreen", {
                chat: chat,
              })
            }
          >
            <Icon name="ellipsis-v" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "blue",
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  profileOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
    flex: 4,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 32.5,
  },
  usernameAndOnlineStatus: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  onlineStatus: {
    color: "white",
    fontSize: 16,
  },
  options: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default ChatHeader;
