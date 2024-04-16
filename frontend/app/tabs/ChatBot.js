import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";
import {
  primaryColor,
  accentColor,
  darkColor,
} from "../components/ComponentColors";

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([
    {
      content: "Hello! My Name is Dino! How can I assist you today?",
      sender: { _id: "bot" },
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigation = useNavigation();
  const { profile } = useLogin(); // Assuming profile includes user details

  const sendMessage = async () => {
    if (newMessage.trim()) {
      setIsTyping(true);
      const messageToSend = newMessage;
      setNewMessage(""); // Clear the input field immediately after sending
      try {
        const response = await fetch(
          `http://IPADDRESS:8000/aichat?message=${encodeURIComponent(
            messageToSend
          )}`,
          {
            method: "GET", // Specify the method, GET in this case
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { content: messageToSend, sender: { _id: profile._id } }, // User's message
            { content: data.response, sender: { _id: "bot" } }, // Bot's response, assuming 'data.response' is the field where the bot's message is stored
          ]);
        } else {
          console.error("Failed to fetch response:", data);
        }
        setIsTyping(false);
      } catch (error) {
        console.error("Failed to send message:", error);
        setIsTyping(false);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/users/chatBot.png")}
              />
            </View>
            <Text style={styles.username}>DinoBuddy</Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          style={styles.messageContainer}
          ref={(ref) => (this.scrollView = ref)}
          onContentSizeChange={() =>
            this.scrollView.scrollToEnd({ animated: true })
          }
        >
          {messages.map((m, i) => (
            <View
              key={i}
              style={styles.messageBox(m.sender._id === profile._id)}
            >
              <Text
                style={{
                  color: `${
                    m.sender._id === profile._id ? "#F7FAFD" : "#1D2235"
                  }`,
                  fontSize: 16,
                }}
              >
                {m.content}
              </Text>
            </View>
          ))}
        </ScrollView>
        {isTyping && <Text style={styles.typingText}>Typing...</Text>}
        <View style={styles.bottomBar}>
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type your message here..."
              value={newMessage}
              onChangeText={setNewMessage}
              onSubmitEditing={sendMessage} // Trigger sending message on submit (optional)
            />
          </View>
          <Pressable onPress={sendMessage} style={styles.button}>
            <FeatherIcon name="send" size={20} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: 20,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    flex: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    marginBottom: 50,
  },
  messageInputContainer: {
    maxHeight: 50,
    width: "80%",
    borderRadius: 50,
    borderColor: "#C4DDEF",

    backgroundColor: primaryColor,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 0,
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

  messageBox: (isSelf) => ({
    backgroundColor: isSelf ? "#0093ED" : "#C4DDEF",
    borderRadius: 20,
    padding: 10,
    marginVertical: 4,
    alignSelf: isSelf ? "flex-end" : "flex-start",
  }),
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  sendButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 50,
  },
  typingText: {
    padding: 10,
    fontStyle: "italic",
  },
  bottomBar: {
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
});
