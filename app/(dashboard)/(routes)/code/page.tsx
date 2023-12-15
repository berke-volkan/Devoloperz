import { useRef } from 'react';
import Editor, { OnMount } from "@monaco-editor/react";
import * as y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';

const EditorComponent = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    const doc = new y.Doc();
    const provider = new WebrtcProvider("test-room", doc);
    const type = doc.getText("monaco");
    new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness);
  };

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
export default EditorComponent;
