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
  KeyboardAvoidingView,
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
import AntIcon from "react-native-vector-icons/AntDesign";
import {
  primaryColor,
  accentColor,
  darkColor,
} from "../components/ComponentColors";

var socket, selectedChatCompare;

export default function Messagescreen({ route }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { chat } = route.params;
  const navigation = useNavigation();
  const { profile } = useLogin();

  const fetchMessages = async () => {
    try {
      const { data } = await client.get(`/api/message/${chat._id}`, {
        headers: {
          authorization: `JWT ${profile.token}`,
          accept: "application/json",
        },
      });
      setMessages(data);

      socket.emit("join chat", chat._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chat;
  }, [chat]);

  useEffect(() => {
    socket = io("http://IPADDRESS:8000");
    socket.emit("setup", profile);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // Give Notifcation
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async () => {
    if (newMessage) {
      socket.emit("stop typing");
      try {
        const { data } = await client.post(
          "/api/message/",
          {
            content: newMessage,
            chatId: chat._id,
          },
          {
            headers: {
              authorization: `JWT ${profile.token}`,
              accept: "application/json",
            },
          }
        );
        setNewMessage("");
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.options}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 45,
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
                padding: 0,
                borderColor: accentColor,
              }}
              onPress={() => navigation.goBack()}
            >
              <AntIcon name="arrowleft" size={20} color={accentColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.profile}>
            <View style={styles.imgContainer}>
              <Image style={styles.image} source={{ uri: chat.avatar }} />
            </View>
            <Text style={styles.username}>{chat.chatName}</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 45,
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
                padding: 0,
                borderColor: accentColor,
              }}
              onPress={() =>
                navigation.navigate("GroupProfileScreen", {
                  chat: chat,
                })
              }
            >
              <Icon name="ellipsis-v" size={20} color={accentColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.wrapper}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View
          style={[
            styles.wrapper,
            { paddingVertical: 15, paddingHorizontal: 10 },
          ]}
        >
          <ScrollView style={styles.messageContainer}>
            {messages.map((m, i) => (
              <View key={m._id} style={{ borderRadius: 40 }}>
                <View
                  style={{
                    backgroundColor: `${
                      m.sender._id === profile._id ? "#0093ED" : "#C4DDEF"
                    }`,
                    color: `${
                      m.sender._id === profile._id ? "#F7FAFD" : "#1D2235"
                    }`,
                    borderRadius: 15,
                    padding: 10,
                    maxWidth: "40%",
                    marginLeft: isSameSenderMargin(messages, m, i, profile._id),
                    marginTop: isSameUser(messages, m, i, profile._id) ? 3 : 10,
                  }}
                >
                  <Text
                    style={{
                      color: `${
                        m.sender._id === profile._id ? "#F7FAFD" : "#1D2235"
                      }`,
                    }}
                  >
                    {m.content}
                  </Text>
                </View>

                {(isSameSender(messages, m, i, profile._id) ||
                  isLastMessage(messages, i, profile._id)) && (
                  <Image
                    source={{ uri: m.sender.avatar }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                  />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
        {isTyping && <Text>Typing....</Text>}
        <View style={styles.bottomBar}>
          <View style={styles.messageInputContainer}>
            <TextInput
              onChangeText={(messages) => {
                setNewMessage(messages);
                if (!socketConnected) return;
                if (!typing) {
                  setTyping(true);
                  socket.emit("typing", chat._id);
                }

                let lastTypingTime = new Date().getTime();
                var timerLength = 3000;
                setTimeout(() => {
                  var timeNow = new Date().getTime();
                  var TimeDiff = timeNow - lastTypingTime;

                  if (TimeDiff >= timerLength && typing) {
                    socket.emit("stop typing", chat._id);
                    setTyping(false);
                  }
                }, timerLength);
              }}
              style={styles.messageInput}
              placeholder="Enter your message"
              value={newMessage}
            />
            <Pressable
              onPress={() => {
                console.log("pressed");
              }}
              style={styles.cameraBtn}
            >
              <View>
                <FeatherIcon
                  name="camera"
                  size={20}
                  color={"#C4DDEF"}
                ></FeatherIcon>
              </View>
            </Pressable>
          </View>
          <Pressable onPress={sendMessage} style={styles.button}>
            <View>
              <FeatherIcon name="send" size={20} color="white"></FeatherIcon>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: primaryColor,
    paddingTop: 50,
    paddingBottom: 10,
  },
  messageContainer: {
    flex: 1,
  },
  header: {
    maxHeight: 250,
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
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
  wrapper: {
    flex: 1,
    backgroundColor: "#F7FAFD",
    paddingHorizontal: 8,
  },
  messageInputContainer: {
    maxHeight: 50,
    width: "80%",
    paddingHorizontal: 8,
    borderRadius: 50,
    borderColor: "#C4DDEF",
    backgroundColor: primaryColor,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  messageInput: {
    color: accentColor,
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
    backgroundColor: accentColor,
  },
  cameraBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  bottomBar: {
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
});
