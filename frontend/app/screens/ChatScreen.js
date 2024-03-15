import { useContext, useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ChatHeader from "../components/ChatHeader";

export default function Messagescreen({ navigation, route }) {
  return (
    <>
      <ChatHeader />
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
