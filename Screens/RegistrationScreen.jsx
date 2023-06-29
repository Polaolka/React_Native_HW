import React, {  useState } from "react";
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

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const initialState = {
    login: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handlePress = () => {
    console.log(formData);
    setFormData(initialState);
    showMessage({
      message: "success",
      description: `Логін: ${formData.login}, Email: ${formData.email}, Пароль: ${formData.password}`,
      type: "info",
      duration: 2000,
      backgroundColor: "#6CB0F3",
      color: "white",
    });
    navigation.navigate("Home", { screen: "PostsScreen" });
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
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => {
                // Обробка натискання кнопки
              }}
            >
              <AntDesign
                name="pluscircleo"
                size={24}
                color="#FF6C00"
              />
            </TouchableOpacity>
          </View>
          {/* style={styles.formWrapper} */}
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

            {/* <TouchableOpacity style={styles.button} onPress={handlePress}> */}
              <MainButton
                text="Зареєстуватися"
                onPress={handlePress}
              />
              {/* <Text style={styles.buttonText}>Зареєстуватися</Text>
            </TouchableOpacity> */}

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