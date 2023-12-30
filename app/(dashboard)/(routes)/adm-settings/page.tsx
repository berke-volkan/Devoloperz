"use client";
import React from "react";
import { Slider } from "@nextui-org/react";
import { PowerIcon, PowerOffIcon } from "lucide-react";
import firebase from "firebase/app";
import "firebase/database"; // Firebase Realtime Database için gerekli olan modül
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, Database } from 'firebase/database';
import {Tooltip} from "@nextui-org/tooltip";

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


export default function App() {
  const [value, setValue] = React.useState(0.2);
  const [inputValue, setInputValue] = React.useState("0.2");

  const handleChange = (value) => {
    if (isNaN(Number(value))) return;

    setValue(value);
    setInputValue(value.toString());
  };

  return (
    <Slider 
      label="Temperature" 
      size="sm"
      step={0.01} 
      maxValue={1} 
      minValue={0} 
      color="foreground"
      classNames={{
        base: "max-w-md",
        label: "text-medium",
      }}
      // we extract the default children to render the input
      renderValue={({children, ...props}) => (
        <output {...props}>
          <Tooltip
            className="text-tiny text-default-500 rounded-md"
            content="Press Enter to confirm"
            placement="left"
          >
            <input
              className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
              type="text"
              aria-label="Temperature value"
              value={inputValue}
              onChange={(e) => {
                const v = e.target.value;

                setInputValue(v);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                  setValue(Number(inputValue));
                }
              }}
            />
          </Tooltip>
        </output>
      )}
      value={value}
      onChange={handleChange}
    />
  );
}

