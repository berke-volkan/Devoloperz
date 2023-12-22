// app/l/[shortCode]/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update, Database } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { Bar } from 'react-chartjs-2';

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
const database: Database = getDatabase(app);

type LinkData = { originalUrl: string; shortLink: string , id: string, usage: string };

const ShortCodePage: React.FC = () => {
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string }[];
  }>({
    labels: [],
    datasets: [{ data: [], backgroundColor: 'rgba(75,192,192,0.4)' }],
  });

  useEffect(() => {
    // Ensure we are in the browser environment
    if (typeof window !== 'undefined') {
      const linksRef = ref(database, 'links');
  
      onValue(linksRef, (snapshot) => {
        const links: Record<string, LinkData> = snapshot.val() || {};
  


        // Set up the chart data
        const shortCodes: string[] = [];
        const usageCounts: number[] = [];

        Object.values(links).forEach((link) => {
          shortCodes.push(link.shortLink);
          usageCounts.push(parseInt(link.usage, 10));
        });

        setChartData({
          labels: shortCodes,
          datasets: [{ data: usageCounts, backgroundColor: 'rgba(75,192,192,0.4)' }],
        });

        const pathname = window.location.pathname;
        const shortCode = pathname.split('/').pop();
  
        if (shortCode) {
          const linkEntry = Object.entries(links).find(([key, value]) => value.shortLink === shortCode);
  
          if (linkEntry) {
            const [key, linkData] = linkEntry;
            const newCount = parseInt(linkData.usage, 10) + 1; // Increment usage count
            linkData.usage = newCount.toString();
            const linkRef = ref(database, `links/${key}`); // Doğru referans yolu
            update(linkRef, { usage: newCount.toString() }) // Güncelleme işlemi
              .then(() => {
                setLinkData(linkData);
                window.location.replace(linkData.originalUrl);
              })
              .catch((error) => {
                console.error("Update failed: ", error);
              });
          } else {
            setLinkData(null);
          }
        }
      }, {
        onlyOnce: true
      });
    }
  }, []);

  return (
    <div>
      {linkData ? (
        <p>Redirecting...</p>
      ) : (
        <div>
          <p>Wait</p>
        </div>
      )}
    </div>
  );
};

export default ShortCodePage;
