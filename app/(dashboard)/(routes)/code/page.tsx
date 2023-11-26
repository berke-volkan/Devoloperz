"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { CodeIcon } from 'lucide-react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  username: string;
}

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
const database = getDatabase(app);
const firestore = getFirestore(app);

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const { user } = useUser();
  useEffect(() => {
  // Realtime database dinleme
  const msgRef = ref(database, 'messages');
  onValue(msgRef, (snapshot) => {
    const data = snapshot.val();
    const formattedData: Message[] =
      data
        ? Object.keys(data).map((id) => ({ id, ...data[id] as Message }))
        : [];
    setMessages(formattedData);
  });

  // Firestore dinleme
  const firestoreMsgRef = collection(firestore, 'messages');
  const unsubscribe = onSnapshot(firestoreMsgRef, (snapshot) => {
    const data: Message[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() as Message }));
    setMessages((prevMessages) => [...prevMessages, ...data]);
  });

  return () => unsubscribe();
}, [database, firestore]);

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
