import LoginForm from "../screens/LoginForm";
import SignupForm from "../screens/SignupForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function AppForm({ navigation }) {

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={LoginForm} name="LoginForm" />
        <Stack.Screen component={SignupForm} name="SignupForm" />
      </Stack.Navigator>
  );

}