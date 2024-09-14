import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import SignInButton from "./components/SignInButton";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome to the Chat App
        </h1>
        <div className="text-center">
          {user ? <ChatRoom /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
}

export default App;
