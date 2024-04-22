import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import {primaryColor, inputColor, accentColor, lavenderColor, darkColor} from "./ComponentColors.js"

export default function FormInput(props) {
  const { placeholder, label, error } = props;
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.label}>{label}</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <TextInput {...props} style={styles.input} placeholder={placeholder} placeholderTextColor={primaryColor} color={darkColor}/>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "Metropolis-Black",
  },
  input: {
    fontFamily: "Metropolis-Medium",
    backgroundColor: inputColor,  // Added line for background color
    height: "auto",
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignContent: "center"
  },
  errorText: {
    fontFamily: "Metropolis-Medium",
    color: "red",
    fontSize: 14
  }

});
