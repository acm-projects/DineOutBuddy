import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';

const ForYou = () => {
  const images = [
    { id: 1, src: require('./image.png') },
    { id: 2, src: require('./image2.png') },
    { id: 3, src: require('./image3.png') },
    { id: 4, src: require('./image4.png') },
    { id: 5, src: require('./image5.png') },
    { id: 6, src: require('./image6.png') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>For You</Text>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        style={styles.scrollView}
      >
        {images.map((image) => (
          <Image key={image.id} source={image.src} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: 'white', // Set the background color to blue
    marginBottom: 50,
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
  fontSize: 20,  // Increase text size
  fontWeight: 'bold',  // Make text bold
  marginBottom: 20,  // Add space below the text
  textAlign: 'left',  // Align text to the left
  alignSelf: 'stretch', // Stretch to take the full width if inside a flex container
  marginLeft: 180,
},

  scrollView: {
    flexDirection: 'row',  // Align items in a row
    padding: 20,  // Add some padding around
  },
  image: {
    width: 150,  // Set width of images
    height: 150,  // Set height of images
    marginRight: 10,  // Add margin between images
  },

});

export default ForYou;
