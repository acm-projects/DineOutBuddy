import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View>Search Bar</View>
      <View style={styles.messageWrapper}>
        <View style={styles.messageCard}>
          <View style={styles.image}></View>
          <View style={styles.text}>
            <Text style={styles.name}></Text>
            <Text style={styles.message}></Text>
          </View>
        </View>
        <View style={styles.messageCard}>
          <View style={styles.image}></View>
          <View style={styles.text}>
            <Text style={styles.name}></Text>
            <Text style={styles.message}></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatPage;

const styles = StyleSheet.create({});
