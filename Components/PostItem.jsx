import { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { Feather, AntDesign, FontAwesome5 } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { selectUserId } from "../redux/auth/selectors";
import { coordsToLocationName } from "../servises/coordsToLocationName";
import { getNumber } from "../servises/getNumber.js";


const PostItem = ({ navigation, post }) => {
  const [commentsNumber, setCommentsNumber] = useState(null);
  const [likesNumber, setLikesNumber] = useState(null);
  const [location, setLocation] = useState("");
  const userId = useSelector(selectUserId);
  console.log(post);

  //   {"comments": [], "dateCreate": "", "likes": [], "locationName": "Qwe", "ownerId": "", "photoLocation": {"coords": {"accuracy": 8.461000442504883, "altitude": 205.5, "altitudeAccuracy": 1.295071005821228, "heading": 0, "latitude": 49.4351064, "longitude": 29.6922618, "speed": 0}, "mocked": false, "timestamp": 1688301202793}, "photoUrl": "", "title": "Qwe"}
  const {
    postId,
    photoUrl,
    title,
    locationName,
    photoLocation: {
      coords: { latitude, longitude },
    },
    comments,
    likes,
    ownerId,
  } = post.item;
//   console.log("post.item:", post.item);
  useEffect(() => {
    (async () => {
      try {
        const getCommentsNumber = await getNumber(postId, "comments");
        const getLikesNumber = await getNumber(postId, "likes");

        setCommentsNumber(getCommentsNumber);
        setLikesNumber(getLikesNumber);

        if (!locationName && latitude) {
          setLocation(await getLocationsText());
        }
      } catch (error) {
        console.log("error11:", error);
      }
    })();
  }, [likes, comments]);

  const getLocationsText = async () => {
    try {
      const location = await coordsToLocationName(latitude, longitude);

      const textLocation = `${location[0].city}, ${location[0].region}`;
      if (textLocation.length > 30) {
        textLocation = textLocation.slice(0, 30) + "...";
      }
      return textLocation;
    } catch (error) {
      console.log("error22:", error);
    }
  };

  const handlePressLike = async () => {
    const index = likes.indexOf(userId);

    if (index > -1) {
      likes.splice(index, 1);
    } else {
      likes = [...likes, userId];
    }
    await updateDoc(doc(db, "posts", postId), {
      likes,
    });
  };

  return (
    <View>
      <Image style={styles.image} source={{ uri: photoUrl }} />

      <Text style={styles.title}>{title}</Text>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.btnIcon}
            onPress={() =>
              navigation.navigate("Comments", { photoUrl, comments, postId })
            }
          >
            <View style={{ transform: [{ scaleX: -1 }] }}>
              <FontAwesome5
                name="comment"
                size={24}
                color="#BDBDBD"
                style={styles.commentIcon}
              />
            </View>
            <Text style={styles.comments}>{commentsNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnIcon} onPress={handlePressLike}>
            {likes?.includes(userId) ? (
              <AntDesign name="like1" size={24} color="#FF6C00" />
            ) : (
              <AntDesign
                style={styles.icon}
                name="like2"
                size={24}
                color="#bdbdbd"
              />
            )}
            <Text style={styles.comments}>{likesNumber}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnIcon}
          onPress={() => navigation.navigate("Map", { latitude, longitude })}
        >
          <Feather
            style={styles.icon}
            name="map-pin"
            size={24}
            color="#bdbdbd"
          />
          {locationName ? (
            <Text style={styles.location}>{locationName}</Text>
          ) : (
            <Text style={styles.location}>{location}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  image: {
    height: 240,
    borderRadius: 8,
  },
  commentIcon: { marginLeft: 6 },
  icon: {
    marginRight: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19,
    marginVertical: 8,
  },
  textContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 32,
  },
  btnIcon: { flexDirection: "row", alignItems: "center" },
  comments: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#BDBDBD",
    marginRight: 6,
  },
  location: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#212121",
  },
});
export default PostItem;