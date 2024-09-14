import { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../Firestore";
import { auth } from "../firebaseConfig";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = auth.currentUser; // Get the current user

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages();
      setMessages(msgs);
    };
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (newMessage.trim()) {
      await sendMessage(newMessage, currentUser);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages Container */}
      <div className="flex-grow overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
        {messages.length > 0 ? (
          messages.map((msg, idx) => {
            const isCurrentUser = msg.uid === currentUser?.uid;
            return (
              <div
                key={idx}
                className={`flex mb-4 ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow-md ${
                    isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {/* Display Name */}
                  <p
                    className={`text-sm font-semibold ${
                      isCurrentUser ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.displayName}
                  </p>
                  {/* Message Text */}
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center">No messages yet.</p>
        )}
      </div>

      {/* Input Box and Send Button */}
      <div className="flex items-center space-x-4">
        <input
          className="flex-1 px-4 py-2 m-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
