import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet, } from "react-native";
import React from "react";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const screenOptions = ({ navigation, route }) => ({
  initialRouteName: "Home",
  tabBarShowLabel: false,
  tabBarButton: (props) => <TouchableOpacity {...props} />,
  tabBarActiveTintColor: "#ffffff",
  tabBarActiveBackgroundColor: "#FF6C00",
  tabBarIconStyle: { color: "#212121CC" },
  tabBarHideOnKeyboard: true,
  tabBarIcon: ({ color }) => {
    if (route.name === "Posts") {
      return <Feather name="grid" size={24} color={color} />;
    }
    if (route.name === "CreatePosts") {
      return <Feather name="plus" size={24} color={color} />;
    }
    return <Feather name="user" size={24} color={color} />;
  },
  tabBarItemStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 70,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  tabBarStyle: {
    height: 84,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#b8b8b8",
    paddingTop: 9,
    paddingHorizontal: 30,
  },
});


const Home = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName="Posts" screenOptions={screenOptions}>
      <Tab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#ffffff" : "#212121",
                textAlign: "center",  alignItems: "center"
              }}
            >
              Публікації
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}} style={{ right: 16 }}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
