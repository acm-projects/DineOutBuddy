import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FormHeader = (props) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>{props.leftHeading} </Text>
        <Text style={styles.heading}>{props.rightHeading}</Text>
      </View>
      <Text style={styles.subHeading}>{props.subHeading}</Text>
      <Text style={styles.additionalText}>
        Food, Friends, and Fun!
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // Fix the typo here
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textAlign: "left", // You can adjust this as needed
  },
  subHeading: {
    fontSize: 28,
    color: "white",
    textAlign: "center",
  },
  additionalText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
});

export default FormHeader;
