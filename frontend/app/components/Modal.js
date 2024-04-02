import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  Touchable,
  TouchableOpacity,
  Button,
} from "react-native";
import { GlobalContext } from "../../context";
import { useLogin } from "../../context/LoginProvider";
import axios from "axios";
import client from "../api/client";
import UserCard from "./UserCard";

const NewGroupModal = () => {
  const { profile, chats, setChats } = useLogin();

  const [groupChatName, SetGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const {
    currentGroupName,
    setCurrentGroupName,
    modalVisible,
    setModalVisible,
  } = useContext(GlobalContext);

  function handleCreateNewRoom() {
    console.log(currentGroupName);
    setModalVisible(false);
    setCurrentGroupName("");
    Keyboard.dismiss();
  }

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      const { data } = await client.get(`api/user?search=${search}`, {
        headers: {
          authorization: `JWT ${profile.token}`,
          accept: "application/json",
        },
      });
      setSearchResult(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (deleted) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id != deleted._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      console.log("please fill out alll of the fields");
      return;
    }
    try {
      let allAlergies = [];
      selectedUsers.map((user) => {
        allAlergies = allAlergies.concat(user.allergies);
      });

      let allPreferences = [];
      selectedUsers.map((user) => {
        allPreferences = allPreferences.concat(user.preferences);
      });

      let allCravings = [];
      selectedUsers.map((user) => {
        allCravings = allCravings.concat(user.cravings);
      });

      console.log(allAlergies);

      const { data } = await client.post(
        "/api/chat/group",

        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
          allergies: allAlergies,
          preferences: allPreferences,
          cravings: allCravings,
        },
        {
          headers: {
            authorization: `JWT ${profile.token}`,
            accept: "application/json",
          },
        }
      );
      // console.log(data);
      setChats([data, ...chats]);

      setModalVisible(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Create a Group</Text>
          <TextInput
            autoCorrect={false}
            placeholder="Enter group name"
            style={styles.loginInput}
            placeholderTextColor={"white"}
            onChangeText={(value) => SetGroupChatName(value)}
            value={groupChatName}
          />
          <TextInput
            autoCorrect={false}
            placeholder="Find Users"
            style={styles.loginInput}
            placeholderTextColor={"white"}
            onChangeText={(value) => handleSearch(value)}
            value={search}
          />
          {selectedUsers.map((user) => (
            <TouchableOpacity
              key={user._id}
              style={{
                backgroundColor: "#C4DDEF",
                marginBottom: 10,
                borderWidth: 0.5,
                borderRadius: 10,
                paddingVertical: 3,
                marginBottom: 10,
              }}
              onPress={() => {
                handleDelete(user);
              }}
            >
              <UserCard user={user} />
            </TouchableOpacity>
          ))}
          {searchResult?.slice(0, 4).map((user) => (
            <TouchableOpacity
              key={user._id}
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                paddingVertical: 3,
                marginBottom: 10,
              }}
              onPress={() => {
                handleGroup(user);
              }}
            >
              <UserCard user={user} />
            </TouchableOpacity>
          ))}
          <View style={styles.buttonWrapper}>
            <Pressable onPress={handleSubmit} style={styles.button}>
              <View>
                <Text style={styles.buttonText}>Add</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
              <View>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 200,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 300,
  },
  title: {
    color: "#0093ED",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  loginInput: {
    borderRadius: 50,
    padding: 8,
    backgroundColor: "#C4DDEF",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#0093ED",
    padding: 15,
    marginVertical: 10,
    elevation: 1,
    borderRadius: 50,
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default NewGroupModal;
