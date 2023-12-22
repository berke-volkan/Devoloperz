"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { Shield, BadgeCheckIcon, MessageSquare, CheckCircleIcon } from 'lucide-react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { cn } from '@/lib/utils';
import { User as NextUser } from '@nextui-org/user';
import {Badge} from "@nextui-org/badge"
import {Spacer} from "@nextui-org/spacer"
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";

const firebaseConfig = {
  apiKey: "AIzaSyBq0UtNaMQ9W2yrOakjutO47WZjJgH4bUw",
  authDomain: "devoloperz.firebaseapp.com",
  projectId: "devoloperz",
  storageBucket: "devoloperz.appspot.com",
  messagingSenderId: "851290003802",
  appId: "1:851290003802:web:4761f04f7a1b4b63273b63"
};
// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const RenderMessage: React.FC<{ message: Message }> = ({ message }) => {
  if (message.lastname === "Admin") {
    return (
      <div>
        <Popover showArrow
      backdrop="opaque"
      placement="right"
      classNames={{
        base: [  
          // arrow color
          "before:bg-default-200"
        ],
        content: [
          "py-3 px-4 border border-default-200",
          "bg-gradient-to-br from-black to-default-gray",
          "dark:from-default-100 dark:to-default-50",
        ],
      }}>
          <PopoverTrigger>
        <Badge
          isOneChar
          content={<Shield className="text-green-500" />}
          color="success"
          placement="top-right"
        >
          
          <Spacer x={4} />
        </Badge>
        </PopoverTrigger>
        <PopoverContent>
        <div className="px-1 py-2 ">
          <div className="text-small font-bold text-white">Staff Badge</div>
          <div className="text-tiny text-white">This user  protecting our community from toxic peoples.  </div>
          <div className="text-tiny text-white">Apply as a staff from our email!</div>
        </div>

        </PopoverContent>
        </Popover>
        <NextUser
          name={message.username}
          description={message.lastname}
          avatarProps={{
            src: message.avatar,
          }}
        />
        <Spacer x={4}/>
        <span className="text-gray-500">{message.timestamp}</span> - {message.text}
      </div>
    );
  } else if (message.lastname === "Verified") {
    return (
      <div>
      <Popover showArrow
    backdrop="opaque"
    placement="right"
    classNames={{
      base: [  
        // arrow color
        "before:bg-default-200"
      ],
      content: [
        "py-3 px-4 border border-default-200",
        "bg-gradient-to-br from-black to-default-gray",
        "dark:from-default-100 dark:to-default-50",
      ],
    }}>
        <PopoverTrigger>
      <Badge
        isOneChar
        content={<BadgeCheckIcon className="text-green-500" />}
        color="success"
        placement="top-right"
      >
        
        <Spacer x={4} />
      </Badge>
      </PopoverTrigger>
      <PopoverContent>
      <div className="px-1 py-2 ">
        <div className="text-small font-bold text-white">Verified Badge</div>
        <div className="text-tiny text-white">This user is verified  </div>
        <div className="text-tiny text-white">This user showed his talent!
        </div>
      </div>

      </PopoverContent>
      </Popover>
      <NextUser
        name={message.username}
        description={message.lastname}
        avatarProps={{
          src: message.avatar,
        }}
      />
      <Spacer x={4}/>
      <span className="text-gray-500">{message.timestamp}</span> - {message.text}
    </div>
    );
  } else {
    return (
      <div>
        <NextUser
          name={message.username}
          description={message.lastname}
          avatarProps={{
            src: message.avatar,
          }}
        />
        <Spacer x={4}/>
        <span className="text-gray-500">{message.timestamp}</span> - {message.text}
      </div>
    );
  }
};

interface Message {
  id: string;
  text: string;
  timestamp: string;
  username: string;
  lastname: string;
  avatar: string;
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
      username: user.firstName?.substring(0, 5) ?? "anonim",
      lastname: user.lastName ?? "",
      avatar: user.profileImageUrl ?? "",
    };

    const messagesRef = ref(database, 'messages');
    push(messagesRef, message);

    setNewMessage('');
  };

  useEffect(() => {
    const msgRef = ref(database, 'messages');
    const unsubscribe = onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = data
        ? Object.keys(data).map((id) => ({ id, ...data[id] }))
        : [];
      setMessages(formattedData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <Heading
          title="Chat Room"
          description="Chat With Devs!"
          icon={MessageSquare}
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
        
            <RenderMessage message={message} />
          </div>
        ))}
      </div>
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
    </>
  );
};

const AuthenticatedApp = () => (
  <App />
);

export default AuthenticatedApp;