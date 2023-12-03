// app/l/[shortCode]/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from "firebase/app";

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
const database = getDatabase(app);  // Get the database reference

type LinkData = { originalUrl: string; shortLink: string };

const ShortCodePage: React.FC = () => {
  const [linkData, setLinkData] = useState<LinkData | null>(null);

  useEffect(() => {
    // Tarayıcı ortamında olduğumuzdan emin oluyoruz
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const shortCode = pathname.split('/').pop(); // Assuming the shortCode is the last segment of the URL

      if (shortCode) {
        // Firebase Realtime Database'den tüm linkleri çekin
        const linksRef = ref(database, 'links');

        onValue(linksRef, (snapshot) => {
          const links: Record<string, LinkData> = snapshot.val() || {};
          // Tüm linkler içinde shortLink özelliği shortCode ile eşleşen kaydı bul
          const linkEntry = Object.entries(links).find(([key, value]) => value.shortLink === shortCode);

          if (linkEntry) {
            const [key, linkData] = linkEntry;
            setLinkData(linkData);
            // Redirect to the originalUrl
            window.location.replace(linkData.originalUrl);
          } else {
            // If the short code is not found or does not have a corresponding long URL
            setLinkData(null);
          }
        }, {
          onlyOnce: true // Veri akışını sadece bir kez dinle
        });
      }
    }
  }, []);

  return (
    <div>
      {linkData ? (
        <p>Redirecting...</p>
      ) : (
        <p>URL not found</p>
      )}
    </div>
  );
};

export default ShortCodePage;