import { v4 as uuidv4 } from 'uuid';

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "./config";

export const uploadPhotoToServer = async (photo) => {
  try {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePhotoId = uuidv4();

    const storageRef = ref(storage, `postImages/${uniquePhotoId}`);

    await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(storageRef);
    console.log(photoUrl);

    return photoUrl;
  } catch (error) {
    console.log("error:", error);
  }
};

