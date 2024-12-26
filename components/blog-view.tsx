"use client";

const testimonials=[
        {
            name:"Post title",
            title:"Writer of the post",
            description:"Short desc.",
            href:"/view",
        },    {
            name:"Post title",
            title:"Writer of the post",
            description:"Short desc.",
            href:"/view",
        },    {
            name:"Post title",
            title:"Writer of the post",
            description:"Short desc.",
            href:"/view",
        },    {
            name:"Post title",
            title:"Writer of the post",
            description:"Short desc.",
            href:"/view",
        },    {
            name:"Post title",
            title:"Writer of the post",
            description:"Short desc.",
            href:"/view",
        },    {
            name:"Post title",
            title:"Writer of the post",
            description:"Short desc.",
            href:"/view",
        },    {
            name:"Post title",
            title:"Writer of the post",
            description:"Short desc.",
            href:"/view",
        },
        {
            name:"Post title",
            title:"Writer of the post",
            description:"Short desc.",
            href:"/view",
        },
    ]


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
import Image from 'next/image';

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


interface Message {
  text: string;
  timestamp: string;
  username: string;
  lastname: string;
  desc: string,
  title: string,
  id: string;
  img:string;
} 

const App = () => {
  const [blogtext,Setblogtext] = useState<Message[]>([]);
  const [newblog, setNewblog] = useState('');
  const { user } = useUser();
  const [shortdesc, setShortdesc] = useState('');
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [link, setlink] = useState('');
  const RenderMessage: React.FC<{ message: Message }> = ({ message }) => {
    return(
      <div>
          <h1 className='font-bold uppercase' style={{textAlign:"center",paddingBottom:"2px"}}>{message.title} </h1>
          <img src={message.img}/>
          <h1  style={{textAlign:"center",fontStyle:"italic",paddingTop:"10px"}}>{message.desc}</h1>
          <h1 style={{textAlign:"left",paddingTop:"2px"}}>{message.title}</h1>
          </div>
    )
  };
  const handleSendMessage = () => {
    if (post.trim() === '' || !user) {
      return;
    }

    const blog = {
      text: post,
      timestamp: new Date().toISOString(),
      username: user.firstName?.substring(0, 5) ?? "Devoloperz Team",
      lastname: user.lastName ?? "",
      desc: shortdesc,
      title: title,
      img: link,
    };

    const blogsRef = ref(database, 'blogs');
    push(blogsRef, blog);
    console.log(blog);

    setPost('');
  };

  useEffect(() => {
    const blogRef = ref(database, 'blogs');
    const unsubscribe = onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = data
        ? Object.keys(data).map((id) => ({ id, ...data[id] }))
        : [];
        Setblogtext(formattedData);
        console.log(blogtext);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
    {user?.lastName=="admin" &&  <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter name of the post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
         <input
          type="text"
          placeholder="Enter short description"
          value={shortdesc}
          onChange={(e) => setShortdesc(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Enter post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Enterimage link"
          value={link}
          onChange={(e) => setlink(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </div>}
   
      <div className="container mx-auto p-4" style={{display:"inline-block"}}>
        {blogtext.map((blog) => (
          <div 
            key={blog.id}
            className="p-10   item-start gap-x-10 mt-4 rounded-lg bg-white "
            style={{display:"inline-block",marginLeft:"25px",width:"500px"}}
          >
        
            <RenderMessage message={blog} />
          </div>
        ))}
      </div>
      
    </>
  );
};

export default App