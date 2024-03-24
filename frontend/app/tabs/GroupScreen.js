import MessagesScreen from "../screens/MessageScreen";
import ChatScreen from "../screens/ChatScreen"
import GroupProfileScreen from "../screens/GroupProfileScreen";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const GroupScreen = () => (
    <Stack.Navigator>
      <Stack.Screen component={MessagesScreen} name="MessagesScreen" />
      <Stack.Screen component={ChatScreen} name="ChatScreen" />
      <Stack.Screen component={GroupProfileScreen} name="GroupProfileScreen" />
    </Stack.Navigator>
);

export default GroupScreen;