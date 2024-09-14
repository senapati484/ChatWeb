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
    <div className="w-full max-w-lg">
      <div className="h-64 bg-gray-100 p-4 overflow-y-auto rounded-lg shadow-inner mb-4">
        {messages.map((msg, idx) => (
          <p key={idx} className="mb-2">
            <strong className="text-blue-500">{msg.displayName}</strong>:{" "}
            {msg.text}
          </p>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
