import React from 'react';
import { ScrollView, StyleSheet, Image, View, Text } from 'react-native';

const HomePage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.fullPageText}>
        Top picks that are in close proximity
      </Text>
      <View style={styles.mainView}>
        <Text style={styles.categoryText}>For You</Text>
        <Image
          style={styles.image}
          source={require('Osaka.png')}
        />
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullPageText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 50,
  },
  mainView: {
    width: '100%',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default HomePage;
