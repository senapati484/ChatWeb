import { useState, useEffect } from "react";
import { listenForMessages, sendMessage } from "../Firestore";
import { auth } from "../firebaseConfig";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = listenForMessages(
      (newMessages) => {
        setMessages(newMessages);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    const user = auth.currentUser;
    if (newMessage.trim()) {
      try {
        await sendMessage(newMessage, user);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message.");
      }
    }
  };

  const user = auth.currentUser;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col h-full">
      <div className="flex-grow h-64 overflow-y-auto bg-white p-4 rounded-lg shadow-inner mb-4">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-3 ${
                msg.uid === user.uid ? "justify-end" : "justify-start"
              }`}
            >
              {msg.uid !== user.uid && (
                <img
                  src={msg.photoURL || "https://via.placeholder.com/150"}
                  alt={msg.displayName}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}

              <div
                className={`max-w-xs rounded-lg p-3 ${
                  msg.uid === user.uid
                    ? "bg-blue-500 text-white text-right"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No messages yet.</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <input
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
