import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const getLocation = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    const photoLocation = postDoc.data().photoLocation;
    const latitude = photoLocation.coords.latitude;
    const longitude = photoLocation.coords.longitude;
    return { latitude, longitude };
  } catch (error) {
    console.log(error);
  }
};