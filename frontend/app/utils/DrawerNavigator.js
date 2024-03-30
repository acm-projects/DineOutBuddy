import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppForm from "../tabs/AppForm";
import Test from "../tabs/Test";
import MessagesScreen from "../screens/MessageScreen";
import ChatScreen from "../screens/ChatScreen";
import { useLogin } from "../../context/LoginProvider";
import LoginProvider from "../../context/LoginProvider";
import { createStackNavigator } from "@react-navigation/stack";
import GroupProfileScreen from "../screens/GroupProfileScreen";
import AllergyScreen from "../screens/AllergyScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GroupScreen from "../tabs/GroupScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchScreen from "../tabs/SearchScreen";
import RestaurantScreen from "../tabs/RestaurantScreen";

const Tab = createBottomTabNavigator();
import ImageUpload from "../components/ImageUpload";
import IndividualProfile from "../tabs/IndividualProfile";

import { View, Text, TouchableOpacity } from "react-native";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabArr = [
  {
    route: "Test",
    label: "Test",
    activeIcon: "home",
    inActiveIcon: "home-outline",
    component: Test,
  },
  {
    route: "SearchScreen",
    label: "SearchScreen",
    activeIcon: "search",
    inActiveIcon: "search-circle-outline",
    component: SearchScreen,
  },
  {
    route: "AllergyScreen",
    label: "AllergyScreen",
    activeIcon: "egg",
    inActiveIcon: "egg-outline",
    component: AllergyScreen,
  },
  {
    route: "GroupScreen",
    label: "GroupScreen",
    activeIcon: "chatbox-sharp",
    inActiveIcon: "chatbox-outline",
    component: GroupScreen,
  },
  {
    route: "ImageUpload",
    label: "ImageUpload",
    activeIcon: "images",
    inActiveIcon: "images-outline",
    component: ImageUpload,
  },
  {
    route: "IndividualProfile",
    label: "IndividualProfile",
    activeIcon: "person-circle",
    inActiveIcon: "person-circle-outline",
    component: IndividualProfile,
  },
  {
    route: "RestaurantScreen",
    label: "RestaurantScreen",
    activeIcon: "fast-food-sharp",
    inActiveIcon: "fast-food-sharp",
    component: RestaurantScreen,
  },
];

const DrawerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={item.label}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, focused }) => {
                return (
                  <Ionicons
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    size={20}
                    color={color}
                  />
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default DrawerNavigator;
