import { Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

const MainButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.button}}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};


export default MainButton;