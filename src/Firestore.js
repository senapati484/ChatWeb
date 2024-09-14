import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const messagesRef = collection(db, "messages");

export const sendMessage = async (text, user) => {
  try {
    await addDoc(messagesRef, {
      text,
      uid: user.uid,
      displayName: user.displayName,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

export const getMessages = async () => {
  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
  const querySnapshot = await getDocs(messagesQuery);
  return querySnapshot.docs.map((doc) => doc.data());
};
