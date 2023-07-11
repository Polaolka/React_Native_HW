import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { logOut } from "../redux/posts/authOperations";
import PostItem from "../Components/PostItem";

const PostsScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const { avatar, email, login } = useSelector((state) => state.auth);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("dateCreate", "desc"));
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

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.userFotoWrap}>
          {avatar ? (
            <Image style={styles.userFoto} source={{ uri: avatar }} />
          ) : (
            <Feather name="user" size={60} color="#BDBDBD" />
          )}
        </View>
        <View>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>

      <View>
        {posts.length ? (
          <View style={styles.postWrap}>
            <FlatList
              data={posts}
              keyExtractor={(item) => item.postId}
              renderItem={(item) => (
                <PostItem post={item} navigation={navigation} />
              )}
            />
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingBottom: 32,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  userInfo: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  userFotoWrap: {
    width: 60,
    height: 60,
    backgroundColor: "#212121",
    borderRadius: 16,
    marginRight: 8,
    overflow: "hidden",
  },
  userFoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userName: {
    fontFamily: "Roboto-medium",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-regular",
    fontSize: 11,
    color: "#212121CC",
  },
  postWrap: {
    marginBottom: 32,
  },
});

export default PostsScreen;
