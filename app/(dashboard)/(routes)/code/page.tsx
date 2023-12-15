"use client"

import Editor from "@monaco-editor/react";
import { useRef } from 'react';
import * as y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';

const EditorComponent = () => {
  const editorRef = useRef(null);

  function handleMount(editor) {
    editorRef.current = editor;
    const doc = new y.Doc();
    const provider = new WebrtcProvider("test-room", doc);
    const type = doc.getText("monaco");
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
  }

  return (
    <Editor
      height="100vh"
      width="100vh"
      theme="vs-dark"
      onMount={handleMount}
    />
  );
};

export default EditorComponent;
