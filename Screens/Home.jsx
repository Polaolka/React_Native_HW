import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Start Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
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
