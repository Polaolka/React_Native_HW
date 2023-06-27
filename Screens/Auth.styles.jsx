import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 0,
  },
  imageBG: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  avatarThumb: {
    position: "relative",
    borderRadius: 16,
    width: 120,
    height: 120,
    marginTop: 203,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
    zIndex: 10,
  },
  title: {
    color: "#212121",
    fontSize: 30,
    height: 36,
    margin: 32,
    fontFamily: "Roboto-medium",
    lineHeight: 35,
    textAlign: "center",
  },
  addIcon: {
    // position: "absolute",
    // top: 81,
    // right: -12,
  },
  formWrapper: {
    marginTop: -60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    width: "100%",
    fontFamily: "Roboto-regular",
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 78,
  },
  formWrapperLogin: { 
    marginTop: 320,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    width: "100%",
    fontFamily: "Roboto-regular",
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 78,
   },
  buttonAdd: {
    position: "absolute",
    top: 81,
    right: -12,
    backgroundColor: "",
    borderRadius: 50,
    borderWidth: 0,
  },
  inputContainer: {
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    height: 50,
    marginBottom: 16,
    fontSize: 16,
    color: "#212121",
  },
  inputContainerActive: {
    borderColor: "#FF6C00",
  },
  placeholderText: {
    position: "absolute",
    left: 16,
    top: 14,
    fontSize: 16,
    color: "#BDBDBD",
    backgroundColor: "transparent",
  },
  placeholderTextPass: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",

  },
  placeholderPassBtn: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 14,
    right: 16,
  },
  placeholderTextActive: {
    color: "transparent",
    backgroundColor: "transparent",
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    color: "#212121",
  },
  inputFocused: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    color: "#212121",
  },
  button: {
    height: 51,
    backgroundColor: "#FF6C00",
    marginTop: 27,
    marginBottom: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  navigate: {
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
  },
  buttonText: {
    color: "#FFFFFF",
  },
});
