"use client";
import React from "react";
import { Slider } from "@nextui-org/react";
import { PowerIcon, PowerOffIcon } from "lucide-react";
import firebase from "firebase/app";
import "firebase/database"; // Firebase Realtime Database için gerekli olan modül
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, Database } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyBq0UtNaMQ9W2yrOakjutO47WZjJgH4bUw",
    authDomain: "devoloperz.firebaseapp.com",
    projectId: "devoloperz",
    storageBucket: "devoloperz.appspot.com",
    messagingSenderId: "851290003802",
    appId: "1:851290003802:web:4761f04f7a1b4b63273b63"
  };
  // Firebase'i başlat
// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const App = () => {
const handleSliderChange = (value: number | number[]) => {
  // Eğer `value` bir sayı dizisiyse, ilk değeri kullan
  const sliderValue = Array.isArray(value) ? value[0] : value;
  // Firebase veritabanındaki "chatMode" adlı bir alanı güncelle
  const linkRef = ref(database, 'bakim/chat');
  update(linkRef, { chatMode: sliderValue });
};
  return (
      <div>
    <Slider
      label="Chat Mode (0 Açık - 1 Kapalı)"
      step={1}
      maxValue={1}
      minValue={0}
      defaultValue={0}
      className="max-w-lg"
      startContent={<PowerIcon className="text-2xl" />}
      endContent={<PowerOffIcon className="text-2xl" />}
      onChange={handleSliderChange} // Slider değeri değiştiğinde çağrılacak fonksiyon
    />
          </div>
  );
};

export default App;
