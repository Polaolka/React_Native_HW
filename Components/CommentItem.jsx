import { Feather } from "@expo/vector-icons";
import { Text, View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/auth/selectors";

const CommentItem = ({ comment }) => {
  const { userId, text, userAvatar, createDate } = comment?.item;
  const currentUserId  = useSelector(selectUserId);

  return (
    <View style={currentUserId === userId ? styles.userContainer : styles.container}>
      {userAvatar ? (
        <Image
          source={{ uri: userAvatar }}
          style={currentUserId === userId ? styles.userAvatar : styles.avatar}
        />
      ) : (
        <Feather name="user" size={28} color="#bdbdbd" style={styles.avatar} />
      )}
      <View style={currentUserId === userId ? styles.userTextContainer : styles.textContainer}>
        <Text style={styles.text} lineBreakMode={"wrap"}>{text}
        </Text>
        <Text style={currentUserId === userId ? styles.userDate : styles.date}>{createDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 24,
  },
  userContainer: {
    flexDirection: "row-reverse",
    marginTop: 24,
  },
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: "#BDBDBD",
  },
  userAvatar: {
    height: 28,
    width: 28,
    borderRadius: 28,
    marginLeft: 16,
  },
  textContainer: {
    flex: 1,
    backgroundColor: "#00000008",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    padding: 16,
    marginBottom: 24,
  },
  userTextContainer: {
    flex: 1,
    backgroundColor: "#00000008",
    borderRadius: 6,
    borderTopRightRadius: 0,
    padding: 16,
    marginBottom: 24,
  },
  text: {
    color: "#212121",
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 18,
  },
  date: {
    color: "#BDBDBD",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
  },
  userDate: {
    color: "#BDBDBD",
    fontSize: 10,
    lineHeight: 12,
  },
});

export default CommentItem;
