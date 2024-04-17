import React, { useEffect } from "react";
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
import {
  accentClick,
  accentColor,
  inputColor,
  primaryColor,
} from "../components/ComponentColors";

const MessagesScreen = ({ navigation }) => {
  const { modalVisible, setModalVisible } = useContext(GlobalContext);
  const { chats, fetchChats } = useLogin();

  useEffect(() => {
    console.log("Fetching Chats");

    fetchChats();
    console.log(chats);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Groups</Text>
        <View style={styles.icons}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Icon name="pluscircleo" size={25} color={accentColor} />
          </Pressable>
        </View>
      </View>
      <View
        style={[
          chats.length == 0 ? styles.noGroupWrapper : styles.groupWrapper,
        ]}
      >
        {chats.length == 0 ? (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name={"plus"} color={"#C4DDEF"} size={80} />
            <Text
              style={{
                color: "#C4DDEF",
                fontSize: 20,
                fontFamily: "Metropolis-SemiBold",
              }}
            >
              Tap to create or join a new Group{" "}
            </Text>
          </TouchableOpacity>
        ) : (
          chats.map((chat) => {
            return <GroupCard chat={chat} key={chat._id} />;
          })
        )}
      </View>
      {modalVisible && <NewGroupModal />}
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 20,
  },
  header: {
    marginTop: 60,
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
    color: accentColor,
    fontFamily: "Metropolis-Black",
    fontSize: 32,
  },
  groupWrapper: {
    flex: 1,
    flexDirection: "column",

    borderRadius: 20,
  },
  noGroupWrapper: {
    flex: 1,
    flexDirection: "column",
    borderWidth: 4,
    borderRadius: 20,
    borderColor: "#EDF2F4",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
});
