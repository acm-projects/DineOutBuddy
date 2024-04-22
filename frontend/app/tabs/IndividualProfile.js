import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import ImageUpload from "../components/ImageUpload";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLogin } from "../../context/LoginProvider";
import { primaryColor } from "../components/ComponentColors";

const IndividualProfile = ({ navigation }) => {
  const { profile, setIsLoggedIn } = useLogin();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={require("../../assets/profileBackground.png")}
          resizeMode="cover"
          maxHeight={190}
        >
          <View style={styles.profileContainer}>
            <View>
              <ImageUpload></ImageUpload>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.title}>{profile.fullname}</Text>
              <Text style={styles.content}>
                {profile.email} | +1 123 456 8910
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.optionWrapper}>
        <View style={styles.optionContainer}>
          <View style={styles.option}>
            <View style={styles.optionImg}>
              <FeatherIcon size={24} name="edit" />
              <Text style={styles.optionLabel}>Edit Profile Information</Text>
            </View>
            <FeatherIcon size={24} name="chevron-right" />
          </View>
          <View style={styles.option}>
            <View style={styles.optionImg}>
              <FeatherIcon size={24} name="bell" />
              <Text style={styles.optionLabel}>Notifcation Settings</Text>
            </View>
            <FeatherIcon size={24} name="chevron-right" />
          </View>
          <View style={styles.option}>
            <View style={styles.optionImg}>
              <FontAwesomeIcon size={24} name="language" />
              <Text style={styles.optionLabel}>Change Language</Text>
            </View>
            <FeatherIcon size={24} name="chevron-right" />
          </View>
        </View>
        <View style={styles.optionContainer}>
          <Pressable
            style={styles.option}
            onPress={() => {
              navigation.navigate("AllergyScreen");
            }}
          >
            <View style={styles.optionImg}>
              <MaterialIcon size={24} name="peanut-off-outline" />
              <Text style={styles.optionLabel}>Allergies</Text>
            </View>
            <MaterialIcon size={24} name="chevron-right" />
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              navigation.navigate("PreferencesScreen");
            }}
          >
            <View style={styles.optionImg}>
              <FeatherIcon size={24} name="x-square" />
              <Text style={styles.optionLabel}>Preferences</Text>
            </View>
            <FeatherIcon size={24} name="chevron-right" />
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              navigation.navigate("CravingsScreen");
            }}
          >
            <View style={styles.optionImg}>
              <FeatherIcon size={24} name="heart" />
              <Text style={styles.optionLabel}>Cravings</Text>
            </View>
            <FeatherIcon size={24} name="chevron-right" />
          </Pressable>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.option}>
            <View style={styles.optionImg}>
              <FeatherIcon size={24} name="check-square" />
              <Text style={styles.optionLabel}>Help and Support</Text>
            </View>
            <FeatherIcon size={24} name="chevron-right" />
          </View>
          <View style={styles.option}>
            <View style={styles.optionImg}>
              <FeatherIcon size={24} name="message-circle" />
              <Text style={styles.optionLabel}>Contact Us</Text>
            </View>
            <FeatherIcon size={24} name="chevron-right" />
          </View>
          <View style={styles.option}>
            <View style={styles.optionImg}>
              <FeatherIcon size={24} name="lock" />
              <Text style={styles.optionLabel}>Privacy Policy</Text>
            </View>
            <FeatherIcon size={24} name="chevron-right" />
          </View>
        </View>
        <View style={[styles.optionContainer, { backgroundColor: primaryColor }]}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => setIsLoggedIn(false)}
          >
            <View style={styles.optionImg}>
              <FeatherIcon size={24} name="log-out" />
              <Text style={styles.optionLabel}>Log Out</Text>
            </View>
            <FeatherIcon size={24} name="chevron-right" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IndividualProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7FAFD",
    flex: 1,
    flexDirection: "column",
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
    borderColor: primaryColor,
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
    gap: 18,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionLabel: {
    fontSize: 14,
  },
  optionImg: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
