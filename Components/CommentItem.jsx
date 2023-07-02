import { Feather } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";

const CommentItem = () => {
  return (
    <View style={styles.container}>
      <Feather name="user" size={28} color="white" style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.text} lineBreakMode={"wrap"}>
          Really love your most recent photo. I’ve been trying to capture the
          same thing for a few months and would love some tips!
        </Text>
        <Text style={styles.date}>09 червня, 2020 | 08:40</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 24,
  },
  img: {
    height: 28,
    width: 28,
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: "#BDBDBD",
  },
  textContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopLeftRadius: 0,
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
});

export default CommentItem;
