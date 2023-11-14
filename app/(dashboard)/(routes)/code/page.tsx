"use client"

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { CodeIcon } from 'lucide-react';
import Empty from '@/components/empty';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.addEventListener('open', () => {
      console.log('Connected to server');
      setWs(socket);
    });

    socket.addEventListener('message', (event) => {
      const messageBlob = event.data;

      // Blob verisini bir metin olarak almak için aşağıdaki gibi kullanabilirsiniz.
      messageBlob.text().then((text) => {
        console.log('Text content of Blob:', text);

        try {
          // JSON.parse işlemi yapabilirsiniz.
          const parsedMessage = JSON.parse(text);

          // Mesajları güncelleyebilirsiniz.
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (!ws || newMessage.trim() === '') {
      return;
    }

    const message = {
      text: newMessage,
      timestamp: new Date().toISOString(),
      username: user.firstName.substring(0, 5), // Kullanıcının adının ilk 5 harfini alabilirsiniz
    };

    // Gelen mesajı sunucuya gönderiyoruz
    ws.send(JSON.stringify(message));

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
      { messages.length > 0 &&
      <div className="max-h-96 overflow-y-auto bg-gray-200 p-4 rounded-lg mb-4 mt-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
           {message.username}  - <span className="text-gray-500">{message.timestamp}</span> - {message.text}
          </div>
        ))}
      </div>
     }
     {messages.length === 0 &&
     <Empty 
     label="Not web 3.0 yet."/>

     }

    </div>
  );
};

const AuthenticatedApp = () => (
  <App/>
);

export default AuthenticatedApp;
