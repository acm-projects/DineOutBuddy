import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to My App</Text>
        {/* Navigation in React Native would typically be handled differently */}
        {/* You might use React Navigation or another navigation library */}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2024 My App. All rights reserved.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: 20,
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    padding: 10,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});

export default Home;
