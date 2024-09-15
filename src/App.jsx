import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import SignInButton from "./components/SignInButton";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg lg:rounded-xl md:rounded-lg p-5 md:p-8 max-w-4xl w-full h-[90vh] lg:h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Welcome to ChatWeb
          </h1>
          {user && (
            <button
              onClick={handleLogout}
              className=" bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          )}
        </div>

        <div className="flex-grow overflow-hidden">
          {user ? <ChatRoom /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
}

export default App;
