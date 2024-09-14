import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import SignInButton from "./components/SignInButton";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Chat App</h1>
      <div className="bg-white shadow-md rounded-lg p-8">
        {user ? <ChatRoom /> : <SignInButton />}
      </div>
    </div>
  );
}

export default App;
