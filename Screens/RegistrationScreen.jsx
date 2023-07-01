import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "./Auth.styles";
import { AntDesign } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import MainButton from "../Components/Button/MainButton";
import { useDispatch } from "react-redux";
import { launchCameraAsync } from "expo-image-picker";
import { registerUser } from "../redux/auth/authOperations";
import { uploadPhotoToServer } from "../firebase/uploadPhoto.js";
import * as Permissions from "expo-permissions";

export default function RegistrationScreen() {
  const dispatch = useDispatch();
  const initialState = {
    login: "",
    email: "",
    password: "",
    avatar: "",
  };

  const navigation = useNavigation();
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [picture, setPicture] = useState("");
  const [formData, setFormData] = useState(initialState);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFocusLogin = () => {
    setIsFocusedLogin(true);
  };
  const handleBlurLogin = () => {
    setIsFocusedLogin(false);
  };
  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };
  const handleBlurEmail = () => {
    setIsFocusedEmail(false);
  };
  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };
  const handleBlurPassword = () => {
    setIsFocusedPassword(false);
  };

  const takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== "granted") {
        return console.log("Permission not granted");
      }
      const { assets } = await launchCameraAsync();

      if (!assets[0]?.uri) return;

      setPicture(assets[0].uri);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handlePress = async () => {
    Keyboard.dismiss();
    if (!formData.email || !formData.password) {
      showMessage({
        message: "error",
        description: `please fill in the field password and email`,
        type: "info",
        duration: 2000,
        backgroundColor: "#6CB0F3",
        color: "white",
      });
      return;
    }

    try {
      const photoUrl = await uploadPhotoToServer(picture);
      console.log(formData);
      dispatch(
        registerUser({
          ...formData,
          login: formData.login.trim(),
          avatar: photoUrl,
        })
      );
    } catch (error) {
      console.log("error:", error);
    }

    navigation.navigate("Home", { screen: "PostsScreen" });
    setFormData(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          source={require("../assets/Photo_BG.jpg")}
          style={styles.imageBG}
        >
          <View style={styles.avatarThumb}>
            {picture && (
              <Image source={{ uri: picture }} style={styles.userPhoto} />
            )}
            {picture ? (
              <TouchableOpacity
                style={styles.buttonDeleteFoto}
                onPress={() => setPicture("")}
              >
                <AntDesign name="close" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => {
                  takePhoto;
                }}
              >
                <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.formWrapper}>
            <Text style={styles.title}>Реєстрація</Text>

            <View
              style={[
                styles.inputContainer,
                isFocusedLogin && styles.inputContainerActive,
              ]}
            >
              {!formData.login && (
                <Text
                  style={[
                    styles.placeholderText,
                    isFocusedLogin && styles.placeholderTextActive,
                  ]}
                >
                  Логін
                </Text>
              )}
              <TextInput
                style={[styles.input, isFocusedLogin && styles.inputFocused]}
                onFocus={handleFocusLogin}
                onBlur={handleBlurLogin}
                onChangeText={(text) =>
                  setFormData({ ...formData, login: text })
                }
                value={formData.login}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                isFocusedEmail && styles.inputContainerActive,
              ]}
            >
              {!formData.email && (
                <Text
                  style={[
                    styles.placeholderText,
                    isFocusedEmail && styles.placeholderTextActive,
                  ]}
                >
                  Адреса електронної пошти
                </Text>
              )}
              <TextInput
                style={[styles.input, isFocusedEmail && styles.inputFocused]}
                onFocus={handleFocusEmail}
                onBlur={handleBlurEmail}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                value={formData.email}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                isFocusedPassword && styles.inputContainerActive,
              ]}
            >
              <TouchableOpacity
                style={styles.placeholderPassBtn}
                onPress={toggleShowPassword}
              >
                <Text style={styles.placeholderTextPass}>
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              </TouchableOpacity>
              {!formData.password && (
                <Text
                  style={[
                    styles.placeholderText,
                    isFocusedPassword && styles.placeholderTextActive,
                  ]}
                >
                  Пароль
                </Text>
              )}

              <TextInput
                style={[styles.input, isFocusedPassword && styles.inputFocused]}
                onFocus={handleFocusPassword}
                onBlur={handleBlurPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                value={formData.password}
                secureTextEntry={!showPassword}
              />
            </View>
            <MainButton text="Зареєстуватися" onPress={handlePress} />
            <Text style={styles.navigate}>
              Вже є акаунт?{" "}
              <Text
                style={styles.navigateUnderlined}
                onPress={() => navigation.navigate("Login")}
              >
                Увійти
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
