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
    socket = io("http://192.168.50.72:8000");
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("MessagesScreen", {
              chat: chat,
            });
          }}
        >
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
        >
          <View style={styles.messageContainer}>
            {messages.map((m, i) => (
              <View key={m._id}>
                {(isSameSender(messages, m, i, profile._id) ||
                  isLastMessage(messages, i, profile._id)) && (
                  <Text>From {m.sender.username} </Text> // {m.sender}
                )}
                <Text
                  style={{
                    backgroundColor: `${
                      m.sender._id === profile._id ? "#BEE3F8" : "#89F5D0"
                    }`,
                    borderRadius: 20,
                    padding: 5,
                    maxWidth: "25%",
                    marginLeft: isSameSenderMargin(messages, m, i, profile._id),
                    marginTop: isSameUser(messages, m, i, profile._id) ? 3 : 10,
                  }}
                >
                  {m.content}
                </Text>
              </View>
            ))}
          </View>
        </View>
        {isTyping && <Text>Typing....</Text>}
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

          <Pressable onPress={sendMessage} style={styles.button}>
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
    backgroundColor: "#2287D0",
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
    backgroundColor: "#2287D0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
