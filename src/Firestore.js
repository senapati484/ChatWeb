import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const messagesRef = collection(db, "messages");

export const sendMessage = async (text, user) => {
  try {
    await addDoc(messagesRef, {
      text,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

// Real-time listener for new messages
export const listenForMessages = (callback) => {
  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data());

    console.log("Retrieved messages:", messages); // Log the messages
    callback(messages);
  });

  return unsubscribe;
};

// import { updateProfile } from "firebase/auth";
// export const updateUserProfile = async (photoURL) => {
//   const user = auth.currentUser;
//   if (user) {
//     try {
//       await updateProfile(user, {
//         photoURL: photoURL,
//       });
//       console.log("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile: ", error);
//     }
//   }
// };
