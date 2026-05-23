import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKIUk8c4QyAzvpUtP0JNzLwHWgjpyopgA",
  authDomain: "mirrafolio-60173.firebaseapp.com",
  projectId: "mirrafolio-60173",
  storageBucket: "mirrafolio-60173.firebasestorage.app",
  messagingSenderId: "1048367488735",
  appId: "1:1048367488735:web:f7b9187f8ec334b09ad36a",
  measurementId: "G-7CYJH256WB"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();