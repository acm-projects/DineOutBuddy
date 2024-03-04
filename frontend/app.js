import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Questionnare from './components/Questionnare/Questionnare'; // Make sure this is correctly spelled

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Questionnare" component={Questionnare} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
