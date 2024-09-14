import { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../Firestore";
import { auth } from "../firebaseConfig";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages();
      setMessages(msgs);
    };
    fetchMessages();
  }, []);

  const handleSend = async () => {
    const user = auth.currentUser;
    if (newMessage.trim()) {
      await sendMessage(newMessage, user);
      setNewMessage("");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="h-64 overflow-y-auto bg-white p-4 rounded-lg shadow-inner mb-4">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-3">
              <p className="text-blue-500 font-semibold">{msg.displayName}</p>
              <p className="text-gray-800">{msg.text}</p>
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
