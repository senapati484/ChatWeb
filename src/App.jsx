import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import SignInButton from "./components/SignInButton";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <h1>Welcome to the Chat App</h1>
      {user ? <ChatRoom /> : <SignInButton />}
    </div>
  );
}

export default App;
