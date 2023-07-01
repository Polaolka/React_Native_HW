
import { initializeApp } from 'firebase/app';

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {

databaseURL: 'https://my-android-project-fire-default-rtdb.europe-west1.firebasedatabase.app',
apiKey: "AIzaSyB5mvK_jk_QGGsRGounmV1LhUEJI3vD9Ug",
authDomain: "my-android-project-fire.firebaseapp.com",
projectId: "my-android-project-fire",
storageBucket: "my-android-project-fire.appspot.com",
messagingSenderId: "526737019189",
appId: "1:526737019189:web:bf2116f33aa0530badbc7c",
measurementId: "G-Y2C3Y31MX9"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


// My_Android_Project.fire
// firebase login
// firebase init
// firebase deploy