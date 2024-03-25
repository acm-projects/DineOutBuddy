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
  Image,
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
import Icon from "react-native-vector-icons/AntDesign";
import GroupCard from "../components/GroupCard";

const MessagesScreen = ({ navigation }) => {
  const { modalVisible, setModalVisible } = useContext(GlobalContext);
  const { chats, fetchChats } = useLogin();
  fetchChats();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Groups</Text>
        <View style={styles.icons}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Icon name="plus" size={25} color={"#2675EC"} />
          </Pressable>

          <Icon name="search1" size={25} color={"#2675EC"} />
          <Icon name="bars" size={25} color={"#2675EC"} />
        </View>
      </View>
      <View style={styles.groupWrapper}>
        {chats
          ? chats.map((chat) => {
              return <GroupCard chat={chat} key={chat._id} />;
            })
          : null}
      </View>
      {modalVisible && <NewGroupModal />}
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFD",
  },
  header: {
    marginTop: 20,
    paddingVertical: 38,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  title: {
    color: "#2287D0",
    fontWeight: "bold",
    fontSize: 28,
  },
  groupWrapper: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
    paddingVertical: 60,
    flex: 1,
    flexDirection: "column",
    gap: 18,
  },
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
