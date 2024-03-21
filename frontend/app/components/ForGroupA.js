import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ForGroupA = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>For Group A</Text>
      {/* Add more content here */}
      <Image
        source={require('./Osaka.png')} // Example path to local image
        style={styles.image}
      />
            {/* I will call the api here instead of the image to retrieve the restaurants based on the restrictions. */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20, // Adjusted paddingTop value
  },
  title: {
    fontSize: 30, // Reduced font size
    fontWeight: 'bold',
    marginBottom: 10, // Reduced marginBottom
  },
    image: {
        width: 200, // Adjust width as needed
        height: 200, // Adjust height as needed
        marginBottom: 20, // Add margin to separate from the title
    },
});

export default ForGroupA;
