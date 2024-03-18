import React from "react";
import { useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../styles/MessageStyles";
import { GlobalContext } from "../../context";
import NewGroupModal from "../components/Modal";
import client from "../api/client";
import { useLogin } from "../../context/LoginProvider";

const MessagesScreen = ({ navigation }) => {
  const { modalVisible, setModalVisible } = useContext(GlobalContext);
  const { chats, fetchChats } = useLogin();
  fetchChats();
  return (
    <Container style={styles.container}>
      {chats &&
        chats.map((chat) => (
          <Card
            key={chat._id}
            onPress={() =>
              navigation.navigate("ChatScreen", {
                chat: chat,
              })
            }
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={require("../../assets/users/user-1.jpg")} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{chat.chatName}</UserName>
                  <PostTime>"1 day ago"</PostTime>
                </UserInfoText>
                <MessageText>"Hello"</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        ))}
      <View style={styles.bottomContainer}>
        <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Create New Group</Text>
          </View>
        </Pressable>
      </View>
      {modalVisible && <NewGroupModal />}
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
  button: {
    backgroundColor: "#703efe",
    padding: 12,
    width: "100%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
