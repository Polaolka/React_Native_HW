import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import * as MediaLibrary from 'expo-media-library';

const CreatePostScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        Alert.alert("Permission to access location was denied!");
      }
    })();
  }, []);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
  
    getPermissions();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      const locationPhoto = await Location.getCurrentPositionAsync();
      setLocation(locationPhoto.coords);
      setPhoto(photo.uri);
    }
  };

  const sendPhoto = async () => {
    if (locationMessage && photo && message) {
      try {
        const location = await Location.getCurrentPositionAsync();
        console.log(location);
        setMessage("");
        setPhoto("");
        setLocationMessage("");
        navigation.navigate("Posts");
      } catch (error) {
        console.log("Помилка при отриманні геолокації", error);
      }
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.cameraWrap}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoWrap}>
              <Image
                source={{ uri: photo }}
                style={{ height: 100, width: 150, borderRadius: 10 }}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.snapWrap}
            activeOpacity={0.6}
            onPress={takePhoto}
          >
            <FontAwesome
              name="camera"
              size={24}
              color={photo ? "#fff" : "#BDBDBD"}
            />
          </TouchableOpacity>
        </Camera>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Назва..."}
          placeholderTextColor={"#BDBDBD"}
          value={message}
          onChangeText={setMessage}
        />
        <TextInput
          style={styles.input}
          placeholder={"Місцевість..."}
          placeholderTextColor={"#BDBDBD"}
          value={locationMessage}
          onChangeText={setLocationMessage}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={locationMessage && photo && message ? styles.btn : styles.disBtn}
        disabled={locationMessage && photo && message ? false : true}
        onPress={sendPhoto}
      >
        <Text style={styles.textBtn}>Опублікувати</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  cameraWrap: {
    height: 240,
    marginTop: 32,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoWrap: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },

  snapWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    padding: 16,
    marginTop: 16,
    alignItems: "center",
  },
  disBtn: {
    backgroundColor: "#BDBDBD",
    borderRadius: 100,
    padding: 16,
    marginTop: 16,
    alignItems: "center",
  },
  textBtn: {
    color: "#FFFFFF",
  },
  inputContainer: {},
  inputContainerActive: {},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,

    fontFamily: "Roboto-regular",
    fontSize: 16,
    color: "#212121",
    height: 50,
  },
});

export default CreatePostScreen;
