import { Feather, AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { authSignOutUser } from "../redux/auth/authOperations";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { avatar, email, isAuth, login, userId } = useSelector(selectUser);
  const [avatarImg] = useState(avatar || "");
  const [posts, setPosts] = useState([]);
  return (
    <ImageBackground
      source={require("../assets/Photo_BG.jpg")}
      style={styles.imageBgr}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}} style={styles.exitBtn}>
          <Feather name="log-out" size={24} color="#bdbdbd" />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Feather name="user" size={120} color="#bdbdbd" />
          <TouchableOpacity style={styles.btnAdd} activeOpacity={1}>
            <AntDesign
              name="pluscircleo"
              size={24}
              color="#FF6C00"
              style={styles.addIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.login}>user name</Text>
        <View>
          <Text>posts</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export const styles = StyleSheet.create({
  imageBgr: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 125,
    marginTop: 147,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  exitBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  avatar: {
    position: "relative",
    borderRadius: 16,
    width: 120,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
  },
  btnAdd: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderWidth: 0,
  },
  login: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 32,
  },
});
