import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { accentColor, accentClick, primaryColor } from "./ComponentColors.js";

const FormSubmitBtn = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting
    ? accentClick
    : accentColor;

  return (
    <TouchableOpacity
      onPress={submitting ? null : onPress}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FormSubmitBtn;

const styles = StyleSheet.create({
  container: {
    height: "auto",
    backgroundColor: accentClick,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Metropolis-Medium",
    fontSize: 16,
    color: primaryColor
  }
});
