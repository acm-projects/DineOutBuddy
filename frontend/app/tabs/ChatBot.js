import { useContext, useEffect, useLayoutEffect, useState } from "react";
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
  ScrollView,
} from "react-native";
import ChatHeader from "../components/ChatHeader";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome";
import client from "../api/client";
import { useLogin } from "../../context/LoginProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import io from "socket.io-client";
import FeatherIcon from "react-native-vector-icons/Feather";

var socket, selectedChatCompare;

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigation = useNavigation();
  const { profile } = useLogin();

  const fetchMessages = async () => {};

  const sendMessage = async () => {};

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/users/user-1.jpg")}
              />
            </View>
            <Text style={styles.username}>DinoBuddy</Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View
          style={[
            styles.wrapper,
            { paddingVertical: 15, paddingHorizontal: 10 },
          ]}
        >
          <ScrollView style={styles.messageContainer}>
            {/*messages.map((m, i) => (
              <View key={m._id}>
                {(isSameSender(messages, m, i, profile._id) ||
                  isLastMessage(messages, i, profile._id)) && (
                  <Text>From {m.sender.username} </Text> // {m.sender}
                )}
                <Text
                  style={{
                    backgroundColor: `${
                      m.sender._id === profile._id ? "#C4DDEF" : "#F2F5F8"
                    }`,
                    borderRadius: 20,
                    padding: 10,
                    maxWidth: "40%",
                    marginLeft: isSameSenderMargin(messages, m, i, profile._id),
                    marginTop: isSameUser(messages, m, i, profile._id) ? 3 : 10,
                  }}
                >
                  {m.content}
                </Text>
              </View>
            ))*/}
          </ScrollView>
        </View>
        {isTyping && <Text>Typing....</Text>}
        <View style={styles.messageInputContainer}>
          <Pressable
            onPress={() => {
              console.log("pressed");
            }}
            style={styles.cameraBtn}
          >
            <View>
              <FeatherIcon name="camera" size={15} color="black"></FeatherIcon>
            </View>
          </Pressable>
          <TextInput
            style={styles.messageInput}
            placeholder="Enter your message"
            value={newMessage}
          />
          <Pressable onPress={sendMessage} style={styles.button}>
            <View>
              <FeatherIcon name="send" size={20} color="white"></FeatherIcon>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFD",
    paddingTop: 50,
    paddingBottom: 10,
  },
  messageContainer: {
    flex: 1,
  },
  header: {
    maxHeight: 250,
    flex: 1,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    flex: 4,
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
  username: {
    marginLeft: 15,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  options: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#F7FAFD",
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  messageInputContainer: {
    maxHeight: 50,
    width: "100%",
    paddingHorizontal: 8,
    borderRadius: 50,
    backgroundColor: "#C4DDEF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  messageInput: {
    color: "white",
    padding: 15,
    flex: 1,
    borderRadius: 50,
  },
  button: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cameraBtn: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
