import React from "react";
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

const PostsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.userFotoWrap}>
          <Image
            style={styles.userFoto}
            source={require("../assets/User_foto.jpg")}
          />
        </View>
        <View >
          <Text style={styles.userName}>User Name</Text>
          <Text style={styles.userEmail}>User Email</Text>
        </View>
      </View>
      <View style={styles.postWrap}>
        <View style={styles.imgWrap}>
          <Image
            source={require("../assets/Rectangle_23.jpg")}
            style={styles.photo}
          />
        </View>

        <Text style={styles.message}>Message`s text</Text>
        <View style={styles.postInfoWrap}>
          <TouchableOpacity style={styles.commentsInfo} onPress={() => navigation.navigate("Comments")}>
            <FontAwesome5 name="comment" size={24} color="#BDBDBD" />
            <Text>100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationInfo} onPress={() => navigation.navigate("Map")}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text>Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  userInfo: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  userFotoWrap: {
    width: 60,
    height: 60,
    backgroundColor: "#212121",
    borderRadius: 16,
    marginRight: 8,
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
  imgWrap: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  photo: {
    width: "100%",
    height: 240,
  },
  postInfoWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsInfo: {
    flexDirection: "row",
    gap: 6,
  },
  locationInfo: {
    flexDirection: "row",
    gap: 6,
  },
  message: {
    fontFamily: "Roboto-medium",
    fontSize: 16,
    color: "#212121",
    marginBottom: 10,
  },
});

export default PostsScreen;
