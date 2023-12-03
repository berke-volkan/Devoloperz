// App.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { CodeIcon } from 'lucide-react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { initializeApp } from "firebase/app";

// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyBq0UtNaMQ9W2yrOakjutO47WZjJgH4bUw",
  authDomain: "devoloperz.firebaseapp.com",
  projectId: "devoloperz",
  storageBucket: "devoloperz.appspot.com",
  messagingSenderId: "851290003802",
  appId: "1:851290003802:web:4761f04f7a1b4b63273b63"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// App.tsx
// ... (previous imports)

interface Link {
  shortLink: string;
  originalUrl: string;
}

const App: React.FC = () => {
  const [shortLinks, setShortLinks] = useState<Link[]>([]);
  const [longUrl, setLongUrl] = useState('');
  const { user } = useUser();

  // Function to handle URL shortening form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const shortCode = generateShortCode();
      const linksRef = ref(database, 'links');
      const link = `${shortCode}`;
      const data: Link = { shortLink: link, originalUrl: longUrl };
      push(linksRef, data);
      setShortLinks([...shortLinks, data]); // Update short links state
      alert(`Short URL: ${window.location.origin}/l/${shortCode}`);
    } catch (error) {
      console.error('An error occurred during URL shortening:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Function to generate a short code
  const generateShortCode = (): string => {
    return Math.random().toString(36).substring(2, 8);
  };

  return (
    <div className="container mx-auto p-4">
      <Heading
        title="URL Shortener"
        description="Shorten your URLs with ease"
        icon={CodeIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      {/* URL shortening form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-4">
        <input
          type="url"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg">
          Shorten URL
        </button>
      </form>
      {/* Display the list of short links */}
      <div className="max-h-96 overflow-y-auto bg-white p-4 rounded-lg shadow-md mb-4 mt-4">
        {shortLinks.map((link, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold">Short Link:</span>{' '}
                <a href={link.shortLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {link.shortLink}
                </a>
              </div>
              <div>
                <span className="font-semibold">Original URL:</span>{' '}
                <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {link.originalUrl}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AuthenticatedApp: React.FC = () => (
  <App />
);

export default AuthenticatedApp;
