// App.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { Line } from 'react-chartjs-2';

import { getDatabase, ref, onValue, push,set } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { LinkIcon } from 'lucide-react';




// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyBq0UtNaMQ9W2yrOakjutO47WZjJgH4bUw",
  authDomain: "devoloperz.firebaseapp.com",
  databaseURL: "https://devoloperz-default-rtdb.firebaseio.com",
  projectId: "devoloperz",
  storageBucket: "devoloperz.appspot.com",
  messagingSenderId: "851290003802",
  appId: "1:851290003802:web:72fc84a7a02e0371273b63"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface Memo {
  writer: string;
  content: string;
}

const App: React.FC = () => {
  const { user } = useUser();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [content, setContent] = useState('');

  // Function to fetch memo data from Firebase
  useEffect(() => {
    const memosRef = ref(database, 'memos');
    onValue(memosRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedMemos: Memo[] = [];
      for (let id in data) {
        const memo = data[id];
        fetchedMemos.push(memo);
      }
      setMemos(fetchedMemos);
    });
  }, []);

  // Function to handle memo submission
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
    // Yeni bir memo oluştur
    const newMemo: Memo = {
      writer: user?.firstName || "Anonymous", // Kullanıcı adını veya varsayılan bir değeri kullan
      content: content
    };

    // Firebase'e yeni memo'yu gönder
    const newMemoRef = push(ref(database, 'memos')); // 'memos' yoluna yeni bir referans oluştur
    set(newMemoRef, newMemo).then(() => {
      console.log('Veri başarıyla gönderildi');
      setContent(''); // Formu temizle
    }).catch((error) => {
      console.error('Veri gönderme hatası:', error);
    });
  } catch (error) {
    console.error('Memo gönderme işlemi sırasında bir hata oluştu:', error);
  }
};


  return (
    <div className="container mx-auto p-4">
      <Heading
        title="Memo App"
        description="Store your memos with ease"
        icon={LinkIcon}
      />

      {/* Memo submission form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-4">
        <input
          type="text"
          placeholder="Enter a memo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg">
          Add Memo
        </button>
      </form>

      {/* Display the list of memos */}
      <div className="max-h-96 overflow-y-auto bg-white p-4 rounded-lg shadow-md mb-4 mt-4">
        {memos.length > 0 ? (
          memos.map((memo, index) => (
            <div key={index} className="mb-4 p-4 border-b last:border-b-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-2 md:mb-0">
                  <span className="font-semibold text-gray-700">Writer:</span>{' '}
                  {memo.writer}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Content:</span>{' '}
                  {memo.content}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No memos available.</div>
        )}
      </div>
    </div>
  );
};

export default App;
