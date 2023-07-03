import {
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  FlatList,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CommentItem from "../Components/CommentItem";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { selectUserAvatar, selectUserId } from "../redux/auth/selectors";
import { format } from "date-fns";
import { useState } from "react";

export default function CommentsScreen({ route }) {
  const { photoUrl, comments, postId } = route.params;
  const [comment, setComment] = useState("");
  const userId = useSelector(selectUserId);
  const avatar = useSelector(selectUserAvatar);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd MMMM, yyyy | HH:mm");
  
  const handleSubmitComment = async () => {
    Keyboard.dismiss();

    const commentData = {
      commentId: uuidv4(),
      text: comment,
      createDate: formattedDate,
      userAvatar: avatar,
      userId,
    };

    comments.push(commentData);

    try {
      await updateDoc(doc(db, "posts", postId), {
        comments,
      });
    } catch (error) {
      console.log("error:", error);
    }

    setComment("");
  }

  return (
    <View style={styles.container}>
      {photoUrl && <Image style={styles.img} source={{ uri: photoUrl }} />}
      <FlatList
        style={styles.commentsList}
        data={comments}
        keyExtractor={(item) => item.commentId}
        renderItem={(item) => <CommentItem comment={item} />}
      />
      <View>
        <TextInput
          style={styles.input}
          placeholder={"Комментировать..."}
          placeholderTextColor={"#BDBDBD"}
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSubmitComment}>
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
  commentsList: {
    marginVertical: 32,
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

[{"commentId": "5150019a-f584-4c7b-b894-5dd019df20ef", "createDate": {"textDate": "03 July, 2023 | 15:03", "unix": "Mon Jul 03 2023 15:03:02 GMT+0300"}, "text": "Йц цукппр", "userAvatar": "https://firebasestorage.googleapis.com/v0/b/my-android-project-fire.appspot.com/o/postImages%2Fe38ff5c9-fc22-4fa9-b775-bfa3d24f09fc?alt=media&token=5f59b6f9-217d-4ec3-a9e1-fcca2323b9fa", "userId": "xUIVDQpSypUFvKxMNlhhVBTsgIQ2"}]