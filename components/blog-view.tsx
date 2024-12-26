"use client";


import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { Shield, BadgeCheckIcon, MessageSquare, CheckCircleIcon } from 'lucide-react';
import { ref, onValue, push } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { cn } from '@/lib/utils';
import { User as NextUser } from '@nextui-org/user';
import {Badge} from "@nextui-org/badge"
import {Spacer} from "@nextui-org/spacer"
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import Image from 'next/image';
import database from '@/app/firebase';


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
      <h1 className='font-bold uppercase' style={{textAlign:"center",paddingBottom:"2px"}}>{message.title}</h1>
      <Image src={message.img} alt={message.title} width={500} height={300} />
      <h1 style={{textAlign:"center",fontStyle:"italic",paddingTop:"10px"}}>{message.desc}</h1>
      <h1 style={{textAlign:"left",paddingTop:"2px"}}>{message.text}</h1>
      <h6 style={{textAlign:"right",paddingTop:"2px"}}>Writen By: {message.username}</h6>
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
      username: user.firstName,
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
    });
  
    return () => unsubscribe();
  }, [blogtext]); // Add blogtext as a dependency

  return (
    <>
    {user?.lastName=="Admin" &&  <div className="flex items-center space-x-4">
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