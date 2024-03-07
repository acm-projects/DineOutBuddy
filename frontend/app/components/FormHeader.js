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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    allignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1b1b33",
  },
  subHeading: {
    fontSize: 18,
    color: "#1b1b33",
    textAlign: "center",
  },
});

export default FormHeader;
