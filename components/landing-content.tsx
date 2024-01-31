"use client";

import React, { useState } from "react";
import { Card, Avatar, Button } from "@nextui-org/react";

export default function App() {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ maxWidth: "400px", backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar isBordered src="/logo.png" />
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>Berke</p>
              <p style={{ color: '#888' }}>Ceo of devoloperz</p>
            </div>
          </div>
          
        </div>
        <div style={{ padding: '1rem' }}>
          <p style={{ color: '#666' }}>
            Devolop your projects faster
          </p>
      </Card>
    </div>
  );
}

