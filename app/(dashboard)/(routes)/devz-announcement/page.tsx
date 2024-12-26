"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { BadgeCheck, BadgeCheckIcon, BadgeInfo, BadgeInfoIcon, CodeIcon, InfoIcon, MessageSquare, Shield } from 'lucide-react';
import {  ref, onValue, push } from 'firebase/database';
import { cn } from '@/lib/utils';
import {database} from '@/app/firebase';
interface Message {
  id: string;
  text: string;
  timestamp: string;
  username: string;
  lastname: string; // Add the 'lastname' property to the Message type
  // Add any other properties you might have
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !user) {
      return;
    }

    const message = {
      text: newMessage,
      timestamp: new Date().toISOString(),
      username: user.firstName?.substring(0, 5), // Add a nullish coalescing operator
      lastname: user.lastName,
    };

    const messagesRef = ref(database, 'announcements');
    push(messagesRef, message);

    setNewMessage('');
  };

useEffect(() => {
  const msgRef = ref(database, 'announcements');
  const unsubscribe = onValue(msgRef, (snapshot) => {
    const data = snapshot.val();
    const formattedData = data
      ? Object.keys(data).map((id) => ({ id, ...data[id] }))
      : [];
    setMessages(formattedData);
  });

  return () => unsubscribe();
}, []); // Empty dependency array indicates no dependencies


  return (
    <>
    <div className="container mx-auto p-4">
      <Heading
        title="Devoloperz announcements"
        description="Latest announcements from Devoplerz"
        icon={InfoIcon}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      
        {messages.map((message) => (
         <div 
  key={message.id}
  className={cn(
    "p-10 w-full flex item-start gap-x-10 mt-4 rounded-lg",
    message.username !== (user?.firstName?.substring(0, 5) ?? "anonim") 
      ? "bg-white border border-black/10" 
      : "bg-muted"
  )}
>
  {message.lastname === "Admin" && <Shield className="text-green-500"/> }
  {message.username} - <span className="text-gray-500">{message.timestamp}</span> - {message.text}
</div>
        ))}
    </div>
    <div className="flex items-center space-x-4">
    
    { user?.lastName=== "Admin" &&    
    <><input
      type="text"
      placeholder="Type your message"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg w-full"
    /><button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-lg">
      Send
    </button> </>}

  </div>
    </>
  );
  
};

const AuthenticatedApp = () => (
  <App />
);

export default AuthenticatedApp;
