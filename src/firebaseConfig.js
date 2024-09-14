import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsOBMMapul806YBjc4MP15mGBSitGephM",
  authDomain: "chatweb-94d67.firebaseapp.com",
  projectId: "chatweb-94d67",
  storageBucket: "chatweb-94d67.appspot.com",
  messagingSenderId: "193233290781",
  appId: "1:193233290781:web:4330b96009e75f81cae8f4",
  measurementId: "G-B2BR0QD9JE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
