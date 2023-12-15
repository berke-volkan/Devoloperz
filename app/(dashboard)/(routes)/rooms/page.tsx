"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heading } from '@/components/heading';
import { CodeIcon } from 'lucide-react';
import { Editor, OnMount } from "@monaco-editor/react";
import * as y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';

const RoomChangeForm: React.FC<{ onRoomChange: (roomId: string) => void }> = ({ onRoomChange }) => {
  const [newRoom, setNewRoom] = useState('');

  const handleSubmitRoomChange = () => {
    onRoomChange(newRoom);
  };

  return (
    <div className="flex items-center space-x-4 mt-4">
      <input
        type="text"
        placeholder="Type your new room id"
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg"
      />
      <button onClick={handleSubmitRoomChange} className="p-2 bg-blue-500 text-white rounded-lg">
        Change Room
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const { user } = useUser();
  const [roomIdentifier, setRoomIdentifier] = useState<string | undefined>(undefined);
  const [newMessage, setNewMessage] = useState('');
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  const bindingRef = useRef<MonacoBinding | null>(null);
  const yjsDocs: Record<string, y.Doc> = {};

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    const doc = new y.Doc();
    const provider = new WebrtcProvider(roomIdentifier || '', doc);
    providerRef.current = provider;

    const type = doc.getText('monaco');
    const model = editor.getModel();

    if (model) {
      bindingRef.current = new MonacoBinding(type, model, new Set([editor]), provider.awareness);
    } else {
      console.error('Editor model is null.');
    }
  };

  const handleRoomChange = (roomId: string) => {
    // Disconnect the existing provider
    if (providerRef.current) {
      providerRef.current.destroy();
      providerRef.current = null;
    }

    // Disconnect the existing binding
    if (bindingRef.current) {
      bindingRef.current.destroy();
      bindingRef.current = null;
    }

    // Set the new room ID and create a new Yjs document if necessary
    setRoomIdentifier(roomId);

    if (!yjsDocs[roomId]) {
      yjsDocs[roomId] = new y.Doc();
    }

    // Create a new provider and binding
    if (editorRef.current) {
      const doc = yjsDocs[roomId];
      const provider = new WebrtcProvider(roomId, doc);
      providerRef.current = provider;
      
      const type = doc.getText('monaco');
      const model = editorRef.current.getModel();

      if (model) {
        bindingRef.current = new MonacoBinding(type, model, new Set([editorRef.current]), provider.awareness);
      } else {
        console.error('Editor model is null.');
      }
    }
  };

  const handleSubmitRoomChange = () => {
    handleRoomChange(newMessage);
  };

  useEffect(() => {
    return () => {
      // Cleanup when the component unmounts
      if (providerRef.current) {
        providerRef.current.destroy();
        providerRef.current = null;
      }

      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Heading
        title="Rooms"
        description="Enter your room id and join the room"
        icon={CodeIcon}
        iconColor="text-red-700"
        bgColor="bg-red-700/10"
      />
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Type your room id"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button onClick={handleSubmitRoomChange} className="p-2 bg-blue-500 text-white rounded-lg">
          Create/Change Room
        </button>
      </div>
      {roomIdentifier && (
        <div>
          <Editor height="100vh" width="100vh" theme="vs-dark" onMount={handleMount} />
          <RoomChangeForm onRoomChange={handleRoomChange} />
        </div>
      )}
    </div>
  );
};

const AuthenticatedApp: React.FC = () => (
  <App />
);

export default AuthenticatedApp;
