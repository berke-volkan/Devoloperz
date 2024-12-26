// App.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {  ref, onValue, push } from 'firebase/database';
import { LinkIcon } from 'lucide-react';
import database from '@/app/firebase';

// ChartJS register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Link Usage',
    },
  },
};




interface Link {
  shortLink: string;
  originalUrl: string;
  id: string;
  usage: number; // Changed from string to number
}
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}


const App: React.FC = () => {
  const [shortLinks, setShortLinks] = useState<Link[]>([]);
  const [longUrl, setLongUrl] = useState('');
  const { user } = useUser();
  // chartData state'inin başlangıç değeri ve tipi
const [chartData, setChartData] = useState<ChartData>({
  labels: [],
  datasets: [
    {
      label: 'Link Usages',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
});
  // Function to fetch link usage data from Firebase
  useEffect(() => {
    const linksRef = ref(database, 'links');
    onValue(linksRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedLinks: Link[] = [];
      const labels: string[] = [];
      const usageData: number[] = [];
      for (let id in data) {
        const link = data[id];
        fetchedLinks.push(link);
        labels.push(link.shortLink);
        usageData.push(link.usage);
      }
      setShortLinks(fetchedLinks);
      setChartData({
        labels,
        datasets: [
          {
            label: 'Link Usages',
            data: usageData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      });
    });
  }, []);

  // Function to handle URL shortening form submission
// Function to handle URL shortening form submission
// Function to handle URL shortening form submission
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
    const shortCode = generateShortCode();
    const linksRef = ref(database, 'links');
    const link = `${shortCode}`;
    const CreatorId = user?.id || 'anonymous';
    const usage = 0;
    const newLinkData: Link = { shortLink: link, originalUrl: longUrl, id: CreatorId, usage: usage };
    // Kullanımı push(linksRef, newLinkData) olarak değiştirin
    const newLinkRef = await push(linksRef, newLinkData);
    setShortLinks([...shortLinks, newLinkData]); // Update short links state
    setLongUrl(''); // Clear the input field
    alert(`Short URL: ${link}`);
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
        icon={LinkIcon}
        // icon and other props
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
{shortLinks.length > 0 ? (
  shortLinks.map((link, index) => (
    link.id === user?.id && (
      <div key={index} className="mb-4 p-4 border-b last:border-b-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-2 md:mb-0">
            <span className="font-semibold text-gray-700">Short Link:</span>{' '}
            <a
              href={link.shortLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              {link.shortLink}
            </a>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Original URL:</span>{' '}
            <a
              href={link.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors truncate"
            >
              {link.originalUrl}
            </a>
          </div>
        </div>

      </div>
    )
  ))
) : (
  <div>No short links available.</div>
)}
</div>

              <Line options={options} data={chartData} />
    </div>
  );
};

export default App;
