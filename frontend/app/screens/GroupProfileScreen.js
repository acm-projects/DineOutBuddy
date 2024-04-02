import React from "react";
import { useState } from "react";
import client from "../api/client";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView,
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/users/user-1.jpg")}
          />
          <View style={styles.profileText}>
            <Text style={styles.title}>{chatDetails.chatName}</Text>
            <Text style={styles.text}>
              Group Admin: {chatDetails.groupAdmin.fullname}
            </Text>
          </View>
        </View>

        <View style={styles.optionWrapper}>
          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Users</Text>
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
          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Allergies</Text>
            {chat.allergies.map((allergy, i) => {
              return <Text key={i}>{allergy}</Text>;
            })}
          </View>
          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Preferences</Text>
            {chat.preferences.map((perference, i) => {
              return <Text key={i}>{perference}</Text>;
            })}
          </View>
          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Cravings</Text>
            {chat.cravings.map((craving, i) => {
              return <Text key={i}>{craving}</Text>;
            })}
          </View>
          <View style={styles.optionContainer}>
            <TextInput
              autoCorrect={false}
              placeholder={chat.chatName}
              style={styles.loginInput}
              onChangeText={(value) => SetGroupChatName(value)}
              value={groupChatName}
            />
            <TouchableOpacity onPress={handleRename} style={styles.button}>
              <Text>Update Group Name</Text>
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
                style={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                  paddingVertical: 3,
                  marginBottom: 5,
                }}
                onPress={() => {
                  AddToGroup(user);
                }}
              >
                <UserCard user={user} />
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
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7FAFD",
    flex: 1,
    flexDirection: "column",
    gap: 30,
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    maxHeight: 300,
  },
  profileContainer: {
    paddingTop: 97,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  content: {
    textAlign: "center",
    fontSize: 14,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 13,
    borderColor: "white",
  },
  optionWrapper: {
    paddingHorizontal: 16,
    gap: 16,
    flex: 1,
  },
  optionContainer: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#C4DDEF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionLabel: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2287D0",
  },
  optionImg: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loginInput: {
    borderRadius: 50,
    padding: 8,
    backgroundColor: "#C4DDEF",
  },
  wrapper: {
    flexDirection: "column",
    gap: 18,
  },
  button: {
    backgroundColor: "#0093ED",
    padding: 15,
    elevation: 1,
    borderRadius: 50,
    flex: 1,
  },
});

export default GroupProfileScreen;
