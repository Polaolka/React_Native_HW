import React, { useEffect, useState } from "react";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import { launchCameraAsync } from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { uploadPhotoToServer } from "../firebase/uploadPhotoToServer";
import { writePostToFirestore } from "../firebase/writePostToFirestore";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/auth/selectors";
import { format } from 'date-fns';

const CreatePostScreen = ({ navigation }) => {
  const initialState = {
    photoUrl: "",
    title: "",
    locationName: "",
    photoLocation: "",
    ownerId: "",
    comments: [],
    dateCreate: "",
    likes: [],
  };
  const userId = useSelector(selectUserId);
  const [picture, setPicture] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          Alert.alert("Permission to access location was denied!");
          return;
        }
        const photoLocation = await Location.getCurrentPositionAsync({});
        setFormData((prevState) => ({
          ...prevState,
          photoLocation,
        }));
      } catch (error) {
        console.log("error1:", error);
      }
    })();
  }, [picture]);

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
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied!");
        return console.log("Permission not granted");
      }

      const { assets } = await launchCameraAsync();

      if (!assets[0]?.uri) return;

      setPicture(assets[0]?.uri);
    } catch (error) {
      console.log("error2:", error);
    }
  };

  const sendPhoto = async () => {
    Keyboard.dismiss();
    try {
      const photoUrl = await uploadPhotoToServer(picture);
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'dd MMMM, yyyy | HH:mm');

      await writePostToFirestore({
        ...formData,
        photoUrl,
        ownerId: userId,
        dateCreate: formattedDate,
      });

      navigation.navigate("Posts");
      setPicture("");
      setFormData(initialState);
    } catch (error) {
      console.log("error3:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrap}>
        {picture && <Image source={{ uri: picture }} style={styles.picture} />}
        <TouchableOpacity
          style={picture ? styles.btnPhotoActive : styles.btnPhoto}
          onPress={takePhoto}
        >
          <FontAwesome
            name="camera"
            size={24}
            color={picture ? "#fff" : "#BDBDBD"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Назва..."}
          placeholderTextColor={"#BDBDBD"}
          value={formData.title}
          onChangeText={(value) =>
            setFormData((prevState) => ({ ...prevState, title: value }))
          }
        />
        <View style={styles.locationInfoWrap}>
          <TouchableOpacity
            style={styles.locationInfo}
            onPress={() => navigation.navigate("Map")}
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={"Місцевість..."}
            placeholderTextColor={"#BDBDBD"}
            value={formData.locationName}
            onChangeText={(value) =>
              setFormData((prevState) => ({
                ...prevState,
                locationName: value,
              }))
            }
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={ picture ? styles.btn : styles.disBtn}
        disabled={picture ? false : true}
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
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    marginTop: 32,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
    backgroundColor: "#E8E8E8",
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
  locationInfo: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
  },
  locationInfoWrap: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  picture: {
    position: "absolute",
    height: 240,
    width: Dimensions.get("window").width - 16 * 2,
    top: 0,
    right: 0,
    borderRadius: 8,
  },
  btnPhotoActive: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff4d",
  },
  btnPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default CreatePostScreen;
