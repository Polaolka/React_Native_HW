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
import { logOut } from "../redux/posts/authOperations";
import * as Permissions from "expo-permissions";
import { uploadPhotoToServer } from "../firebase/uploadPhotoToServer";
import { launchCameraAsync, MediaTypeOptions } from "expo-image-picker";
import { updateUser } from "../redux/auth/authOperations";
import PostItem from "../Components/PostItem";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { avatar, login, userId } = useSelector(selectUser);
  const [newPicture, setNewPicture] = useState("");
  const [picture, setPicture] = useState(avatar || "");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), where("ownerId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((post) => {
        allPosts.push({ ...post.data(), postId: post.id });
      });
      setPosts(allPosts);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const signOut = () => {
    dispatch(logOut());
  };

  const takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== "granted") {
        return console.log("Permission not granted");
      }
      const { assets } = await launchCameraAsync();
      if (!assets[0]?.uri) return;
      console.log("assets[0]?.uri:", assets[0]?.uri);
      setNewPicture(assets[0].uri);
      console.log("newPicture:", newPicture);
      const photoUrl = await uploadPhotoToServer(assets[0].uri);
      console.log("photoUrl:", photoUrl);
      dispatch(updateUser(photoUrl));
      setNewPicture(photoUrl);
    } catch (error) {
      console.log("error takePhoto 1:", error);
    }

  };
  const deletePhoto = () => {
    setPicture("");
    setNewPicture("");
  };

  return (
    <ImageBackground
      source={require("../assets/Photo_BG.jpg")}
      style={styles.imageBgr}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={signOut} style={styles.exitBtn}>
          <Feather name="log-out" size={24} color="#bdbdbd" />
        </TouchableOpacity>
        <View style={styles.avatarThumb}>
          {picture || newPicture ? (
            <Image
              source={picture ? { uri: avatar } : { uri: newPicture }}
              style={styles.userPhoto}
            ></Image>
          ) : (
            <Feather name="user" size={120} color="#bdbdbd" />
          )}
          {picture || newPicture ? (
            <TouchableOpacity
              style={styles.buttonDeleteFoto}
              onPress={deletePhoto}
            >
              <AntDesign name="close" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btnAdd} onPress={takePhoto}>
              <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.login}>{login}</Text>
        <View>
          {posts.length ? (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.postId}
              renderItem={(item) => (
                <PostItem post={item} navigation={navigation} />
              )}
            />
          ) : (
            <Text></Text>
          )}
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
  avatarThumb: {
    position: "relative",
    borderRadius: 16,
    width: 120,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
  },
  userPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 16,
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
  buttonDeleteFoto: {
    position: "absolute",
    top: 81,
    right: -12,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
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
