import React from 'react';
import { View, StyleSheet } from 'react-native';
import ForYou from '../components/ForYou';
import ForGroupA from '../components/ForGroupA';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ForYou />
      <ForGroupA />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content at the top
    alignItems: 'center', // Center content horizontally
    paddingTop: 50, // Add paddingTop to create space from the top
    backgroundColor: '#fff', // Set background color if needed
  },
});

export default Home;
