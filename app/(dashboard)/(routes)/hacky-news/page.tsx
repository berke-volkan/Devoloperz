"use client"
import { Heading } from "@/components/heading";
import { CodeIcon, NewspaperIcon, VideoIcon } from "lucide-react";
import { Empty } from "@/components/empty";
import React from "react";
import axios from "axios";
interface News{
  author: string;
  content: string;
  description: string;
  url: string;
  urlToImage: string;
}
export default function Page() {
    const [news, setNews] = React.useState([]);
    const fetchNews = async () => {
      let response=await fetch("https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=ec969e3ea5b74d19989c7954cfce805c")
      let data=await response.json()
      setNews(data.articles) 
      console.log(data.articles)
    }
    React.useEffect(() => {
      fetchNews();
    }, []);
  return(
    <div className="container mx-auto p-4">
    <Heading
      title="Hacky News"
      description="Latest tech-related news!"
      icon={NewspaperIcon}
      iconColor="text-red-700"
      bgColor="bg-red-700/10"
    />
    {news.length === 0 && <Empty label="Please wait while we are fetching news from 7 ocean" />}
    {news.length !== 0 &&
      news.map((item: News, index: number) => (
      <div key={index} className="flex flex-col p-4 bg-white shadow-md rounded-md mb-4">
        {item.author && <p className="text-gray-700 text-bold text-xl">{item.author}</p> }
        {!item.author && <p className="text-gray-700 text-bold text-xl">Anonymous</p> }
        <img src={item.urlToImage} alt={item.description} className="w-full h-64 object-cover rounded-md" />
        <p className="text-gray-700">{item.description}</p>
        <a href={item.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{item.content}</a>
      </div>
      ))
    }
    </div>
  )
}
