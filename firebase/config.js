import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDX0u-Z8MrwZ7x6hJqcJoX2O0TwpBp-WCk",
  authDomain: "reactnativehw-399015.firebaseapp.com",
  databaseURL: "https://reactnativehw-399015-default-rtdb.firebaseio.com",
  projectId: "reactnativehw-399015",
  storageBucket: "reactnativehw-399015.appspot.com",
  messagingSenderId: "815860457079",
  appId: "1:815860457079:android:021539f01bfc72d3bdb072",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
