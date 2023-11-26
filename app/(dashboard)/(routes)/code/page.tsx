"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { CodeIcon } from 'lucide-react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    // Realtime database dinleme
    const msgRef = ref(database, 'messages');
    onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = data
        ? Object.keys(data).map((id) => ({ id, ...data[id] }))
        : [];
      setMessages(formattedData);
    });

    // Firestore dinleme
    const firestoreMsgRef = collection(firestore, 'messages');
    const unsubscribe = onSnapshot(firestoreMsgRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages((prevMessages) => [...prevMessages, ...data]);
    });

    return () => unsubscribe();
  }, [database, firestore]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    const message = {
      text: newMessage,
      timestamp: new Date().toISOString(),
      username: user.firstName.substring(0, 5),
    };

    // Realtime database'ye ekleme
    const messagesRef = ref(database, 'messages');
    push(messagesRef, message);

    // Firestore'a ekleme
    await addDoc(collection(firestore, 'messages'), message);

    setNewMessage('');
  };

  return (
    <div className="container mx-auto p-4">
      <Heading
        title="Coding Room - Web3"
        description="Blockchain based coding room"
        icon={CodeIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto bg-gray-200 p-4 rounded-lg mb-4 mt-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            {message.username} - <span className="text-gray-500">{message.timestamp}</span> - {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const AuthenticatedApp = () => (
  <App />
);

export default AuthenticatedApp;

