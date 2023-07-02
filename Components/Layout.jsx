import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "../Screens/PostsScreen";
import Home from "../Screens/Home";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen"

const MainStack = createStackNavigator();

export const Layout = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Register" component={RegistrationScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name="CreatePosts" component={CreatePostsScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name="Posts" component={PostsScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
      <MainStack.Screen name="User" component={ProfileScreen}  options={{ headerShown: false }}/>
      <MainStack.Screen name="Comments" component={CommentsScreen} />
      <MainStack.Screen name="Map" component={MapScreen} />
    </MainStack.Navigator>
  );
};