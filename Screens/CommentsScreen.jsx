import {
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CommentItem from "../Components/CommentItem";


export default function CommentsScreen({ route }) {

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../assets/Rectangle_23.jpg")} />

      <CommentItem/>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Комментировать..."}
          placeholderTextColor={"#BDBDBD"}
          onChangeText={() => {}}
        />
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
        <Feather name="arrow-up" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  img: {
    height: 240,
    borderRadius: 8,
  },
  commentList: {
    marginVertical: 32,
  },
  input: {
    height: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 50,
    padding: 16,

    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-medium"
  },
  btn: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 34,
    width: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
});