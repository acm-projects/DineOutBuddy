import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const Test = ({ navigation }) => {
  return (
    <View>
      <Text>Test</Text>
      <Button
        title="Go to GroupPage"
        onPress={() => navigation.navigate("MessagesScreen")}
      />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
