import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FormHeader from './app/components/FormHeader';
import LoginForm from './app/components/LoginForm';
import SignupForm from './app/components/SignupForm';
import Home from './app/components/Home';
import ForYou from './app/components/ForYou';
import Group from './app/components/Group';

import axios from 'axios';
import { useEffect } from 'react';

export default function App() {
  const fetchApi = async () => {
    try {
      const res = await axios.get('http://192.168.1.245:8000/');
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: 140 }}>
        <FormHeader
          leftHeading="Welcome!"
          rightHeading=""
          subHeading="Dine Out Buddy"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      ></View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: 'white' }}
      >
        <Home />

      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#1E90FF', // Set the background color to blue
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
});
