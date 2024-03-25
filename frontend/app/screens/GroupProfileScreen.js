import React from "react";
import { useState } from "react";
import client from "../api/client";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import UserCard from "../components/UserCard";

const GroupProfileScreen = ({ route, navigation }) => {
  const { chat } = route.params;
  const { profile, chats, setChats } = useLogin();

  const [chatDetails, setChatDetails] = useState(chat);
  const [groupChatName, SetGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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

  const AddToGroup = async (userToAdd) => {
    if (chat.users.find((u) => u._id === userToAdd._id)) {
      console.log("User already in group");
      return;
    }
    if (chat.groupAdmin._id != profile._id) {
      console.log("Only admins can add someone");
      return;
    }

    try {
      const { data } = await client.put(
        `api/chat/groupadd`,
        {
          chatId: chat._id,
          userId: userToAdd._id,
        },
        {
          headers: {
            authorization: `JWT ${profile.token}`,
            accept: "application/json",
          },
        }
      );
      setChatDetails(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const RemoveFromGroup = async (userToAdd) => {
    if (chat.groupAdmin._id != profile._id) {
      console.log("Only admins can add someone");
      return;
    }

    try {
      const { data } = await client.put(
        `api/chat/groupremove`,
        {
          chatId: chat._id,
          userId: userToAdd._id,
        },
        {
          headers: {
            authorization: `JWT ${profile.token}`,
            accept: "application/json",
          },
        }
      );
      setChatDetails(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      const { data } = await client.put(
        "/api/chat/rename",
        {
          chatId: chat._id,
          chatName: groupChatName,
        },
        {
          headers: {
            authorization: `JWT ${profile.token}`,
            accept: "application/json",
          },
        }
      );
      setChats(chats.filter((chat) => chat._id != data._id));
      SetGroupChatName("");
      setChats([data, ...chats]);
      setChatDetails({ ...chatDetails, chatName: groupChatName });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat Name: {chatDetails.chatName}</Text>
      <Text style={styles.text}>
        Group Admin: {chatDetails.groupAdmin.fullname}
      </Text>
      <Text style={styles.text}>Users</Text>
      <View style={styles.wrapper}>
        {chatDetails.users.map((user) => (
          <TouchableOpacity
            key={user._id}
            style={styles.text}
            onPress={() => {
              RemoveFromGroup(user);
            }}
          >
            <UserCard user={user}></UserCard>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.text}>Allergies</Text>
      {chat.allergies.map((allergy, i) => {
        return <Text key={i}>{allergy}</Text>;
      })}

      <TextInput
        autoCorrect={false}
        placeholder={chat.chatName}
        style={styles.loginInput}
        onChangeText={(value) => SetGroupChatName(value)}
        value={groupChatName}
      />
      <TouchableOpacity onPress={handleRename}>
        <Text>Update</Text>
      </TouchableOpacity>

      <TextInput
        autoCorrect={false}
        placeholder="Find Users"
        style={styles.loginInput}
        onChangeText={(value) => handleSearch(value)}
        value={search}
      />
      {searchResult?.slice(0, 4).map((user) => (
        <TouchableOpacity
          key={user._id}
          style={{ backgroundColor: "lightblue", marginBottom: 10 }}
          onPress={() => {
            AddToGroup(user);
          }}
        >
          <Text>{user.fullname}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChatScreen", {
            chat: chat,
          });
        }}
        style={{ paddingHorizontal: 5 }}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 34,
    paddingTop: 60,
    paddingLeft: 30,
  },
  text: {
    fontSize: 40,
  },
  loginInput: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 8,
    color: "black",
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: "column",
    gap: 18,
  },
});
export default GroupProfileScreen;
