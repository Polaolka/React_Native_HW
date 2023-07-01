import { nanoid } from 'nanoid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "./config";

export const uploadPhotoToServer = async (photo) => {
  try {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePhotoId = nanoid();

    const storageRef = ref(storage, `postImages/${uniquePhotoId}`);

    await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(storageRef);

    return photoUrl;
  } catch (error) {
    console.log("error:", error);
  }
};