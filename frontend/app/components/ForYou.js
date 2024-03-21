import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ForYou = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>For You</Text>
      <Image
        source={require('./Osaka.png')} // Example path to local image
        style={styles.image}
      />
      {/* Add more content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    marginBottom: 20, // Add margin to separate from the title
  },
});

export default ForYou;
