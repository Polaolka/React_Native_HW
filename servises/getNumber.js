import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const getNumber = async (postId, field) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    const array = postDoc.data()[field];
    const number = array.length;
    return number;
  } catch (error) {
    console.log("error in getNumber:", error);
  }
};