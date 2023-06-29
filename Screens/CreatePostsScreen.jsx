import React, { useEffect, useState, useDispatch } from "react";
import { StyleSheet, Text, Image, View, FlatList, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./Auth.styles";
import { AntDesign } from "@expo/vector-icons";


export default function CreatePostsScreen({}) {
//   const [isFocused, setIsFocused] = useState(false);

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//   };



  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Photo_BG.jpg")}
        style={styles.imageBG}
      >
          <Text style={styles.title}>Posts</Text>
      </ImageBackground>
    </View>
  );
}