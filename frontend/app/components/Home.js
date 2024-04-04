import React from 'react';
import { View, StyleSheet } from 'react-native';
import ForYou from './ForYou';
import Group from './Group';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ForYou />
      <Group />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align items to the bottom
    alignItems: 'center', // Center items horizontally
    marginBottom: 20, // Add margin at the bottom
    paddingHorizontal: 20, // Add horizontal padding
  },
});

export default Home;
