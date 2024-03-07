import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const FormSubmitBtn = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting
    ? "rgba(27,27,51,0.4)"
    : "rgba(27,27,51,1)";

  return (
    <TouchableOpacity
      onPress={submitting ? null : onPress}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={{ fontSize: 18, color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FormSubmitBtn;

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: "rgba(27,27,51,0.4)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
