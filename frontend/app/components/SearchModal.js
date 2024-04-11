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
  ScrollView,
  Image,
} from "react-native";
import { GlobalContext } from "../../context";
import { useLogin } from "../../context/LoginProvider";
import { primaryColor } from "./ComponentColors";
import FeatherIcon from "react-native-vector-icons/Feather";
import GroupCard from "./GroupCard";

const SearchModal = ({
  allergies,
  preferences,
  cravings,
  handleChange,
  handleGroupChange,
}) => {
  const { chats } = useLogin();
  const { modalVisible, setModalVisible } = useContext(GlobalContext);
  const [groupsVisible, setGroupVisible] = useState(false);

  const allAllergies = [
    "Eggs",
    "Lactose",
    "Seafood",
    "Wheat",
    "Sesame",
    "Soy",
    "Tree Nuts",
    "Peanuts",
    "Gluten",
  ];

  const allCravings = [
    "Italian",
    "Japanese",
    "Chinese",
    "Mediterranean",
    "Seafood",
    "Mexican",
    "American",
    "Indian",
    "Middle Eastern",
    "Korean",
    "Indonesian",
    "+",
  ];

  const allPreferences = [
    "Vegetarian",
    "Halal",
    "Vegan",
    "Kosher",
    "Pescantarianism",
    "Keto",
  ];

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
        <View style={[styles.modalView]}>
          {groupsVisible ? (
            <View style={styles.groupModal}>
              <Text style={styles.groupTitle}>Choose Group</Text>
              {chats
                ? chats.map((chat) => {
                    return (
                      <Pressable
                        onPress={() => {
                          handleGroupChange(chat);
                          setModalVisible(false);
                        }}
                        key={chat._id}
                      >
                        <View style={styles.groupCard}>
                          <View style={styles.imgContainer}>
                            <Image
                              style={styles.image}
                              source={require("../../assets/users/user-1.jpg")}
                            />
                          </View>
                          <View style={styles.text}>
                            <View style={styles.cardHeader}>
                              <Text style={styles.name}>{chat.chatName}</Text>
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    );
                  })
                : null}
              <View style={styles.buttonWrapper}>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.button}
                >
                  <View>
                    <Text style={styles.buttonText}>Save</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          ) : (
            <>
              <Pressable
                onPress={() => {
                  setGroupVisible(true);
                }}
              >
                <View
                  style={[
                    styles.modalItem,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text style={styles.title}>Filter by Group</Text>
                  <FeatherIcon name="chevron-right" size={25} color={"black"} />
                </View>
              </Pressable>
              <View style={styles.modalSearchItem}>
                <Text style={styles.title}>Allergens</Text>
                <ScrollView style={styles.cardWrapper} horizontal={true}>
                  {allAllergies.map((allergy) => (
                    <TouchableOpacity
                      key={allergy}
                      onPress={() => {
                        handleChange("allergy", allergy);
                      }}
                      style={[
                        {
                          backgroundColor: allergies.includes(allergy)
                            ? "#0093ED"
                            : "transparent",
                        },
                        styles.card,
                      ]}
                    >
                      <Text
                        style={[
                          {
                            color: allergies.includes(allergy)
                              ? "white"
                              : "#0093ED",
                          },
                          styles.cardText,
                        ]}
                      >
                        {allergy}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.modalSearchItem}>
                <Text style={styles.title}>Restrictions</Text>
                <ScrollView style={styles.cardWrapper} horizontal={true}>
                  {allPreferences.map((p) => (
                    <TouchableOpacity
                      key={p}
                      onPress={() => {
                        handleChange("preference", p);
                      }}
                      style={[
                        {
                          backgroundColor: preferences.includes(p)
                            ? "#0093ED"
                            : "transparent",
                        },
                        styles.card,
                      ]}
                    >
                      <Text
                        style={[
                          {
                            color: preferences.includes(p)
                              ? "white"
                              : "#0093ED",
                          },
                          styles.cardText,
                        ]}
                      >
                        {p}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.modalSearchItem}>
                <Text style={styles.title}>Cravings</Text>

                <ScrollView style={styles.cardWrapper} horizontal={true}>
                  {allCravings.map((c) => (
                    <TouchableOpacity
                      key={c}
                      onPress={() => {
                        handleChange("craving", c);
                      }}
                      style={[
                        {
                          backgroundColor: cravings.includes(c)
                            ? "#0093ED"
                            : "transparent",
                        },
                        styles.card,
                      ]}
                    >
                      <Text
                        style={[
                          { color: cravings.includes(c) ? "white" : "#0093ED" },
                          styles.cardText,
                        ]}
                      >
                        {c}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.buttonWrapper}>
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(false)}
                >
                  <View>
                    <Text style={styles.buttonText}>Save Changes</Text>
                  </View>
                </Pressable>
              </View>
            </>
          )}
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
    backgroundColor: "#C4DDEF",
    borderRadius: 20,
    gap: 10,
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
  modalItem: {
    backgroundColor: "white",
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  modalSearchItem: {
    backgroundColor: "white",
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  title: {
    color: "black",
    fontSize: 20,
    fontFamily: "Metropolis-SemiBold",
    marginBottom: 5,
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderRadius: 20,
    gap: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  cardWrapper: {
    rowGap: 10,
    columnGap: 10,
    maxHeight: 40,
  },
  card: {
    minWidth: 60,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    marginRight: 10,
    borderColor: "#0093ED",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  groupCard: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    paddingHorizontal: 23,
    borderTopWidth: 1,
    borderTopColor: "#CFD6EF",
    borderBottomWidth: 1,
    borderBottomColor: "#CFD6EF",
    paddingVertical: 10,
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  imgContainer: {
    elevation: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: "black",
  },
  name: {
    fontSize: 15,
    fontFamily: "Metropolis-Medium",
  },

  time: {
    fontSize: 14,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
  groupModal: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  groupTitle: {
    fontFamily: "Metropolis-SemiBold",
    fontSize: 20,
    marginBottom: 40,
  },
});

export default SearchModal;
