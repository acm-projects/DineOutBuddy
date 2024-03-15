import { useContext, useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  Keyboard,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import ChatHeader from "../components/ChatHeader";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome";

export default function Messagescreen({ route }) {
  const { chat } = route.params;
  const navigation = useNavigation();
  return (
    <>
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
      <View style={styles.wrapper}>
        <View
          style={[
            styles.wrapper,
            { paddingVertical: 15, paddingHorizontal: 10 },
          ]}
        ></View>
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Enter your message"
          />

          <Pressable style={styles.button}>
            <View>
              <Text style={styles.buttonText}>SEND</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
}

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
  wrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  button: {
    width: "30%",
    backgroundColor: "#703efe",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
