"use client

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { CodeIcon } from 'lucide-react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBq0UtNaMQ9W2yrOakjutO47WZjJgH4bUw",
  authDomain: "devoloperz.firebaseapp.com",
  projectId: "devoloperz",
  storageBucket: "devoloperz.appspot.com",
  messagingSenderId: "851290003802",
  appId: "1:851290003802:web:4761f04f7a1b4b63273b63"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');

    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    });

    return () => unsubscribe();
  }, [firestore]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    const message = {
      text: newMessage,
      timestamp: new Date().toISOString(),
      username: user.firstName.substring(0, 5),
    };

    const messagesRef = collection(firestore, 'messages');
    await addDoc(messagesRef, message);

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

