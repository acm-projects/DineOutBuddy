import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';

const Group = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Group </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require('./image.png')}
          style={styles.image}
        />
        <Image
          source={require('./image2.png')}
          style={styles.image}
        />
        <Image
          source={require('./image3.png')}
          style={styles.image}
        />
        {/* Add more images here */}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: 'white', // Set the background color to white
    marginBottom: 50,
    // Remove justifyContent and alignItems properties
  },
  text: {
    fontSize: 20, // Increase text size
    fontWeight: 'bold', // Make text bold
    marginBottom: 20, // Add space below the text
    textAlign: 'left', // Align text to the left
    // Remove alignSelf and marginLeft properties
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: 150, // Adjust width as needed for desired size
    height: 100, // Adjust height as needed for desired size
  },
});

export default Group;
