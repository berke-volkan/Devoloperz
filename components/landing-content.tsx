"use client"

import React, { useState } from "react";
import { Card, Text, Avatar, Button } from "@nextui-org/react";

export default function App() {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card css={{ mw: "400px", backgroundColor: '#fff' }}>
        <Card.Header css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar bordered src="/logo.png" />
            <div style={{ marginLeft: '1rem' }}>
              <Text b size="1rem">Zoey Lang</Text>
              <Text css={{ color: '$accents7' }}>@zoeylang</Text>
            </div>
          </div>
          <Button
            auto
            ghost={!isFollowed}
            color="primary"
            onClick={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </Card.Header>
        <Card.Body css={{ py: '$10' }}>
          <Text css={{ color: '$accents6' }}>
            Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
          </Text>
          <Text css={{ color: '$accents6', mt: '$4' }}>
            #FrontendWithZoey 💻
          </Text>
        </Card.Body>
        <Card.Footer css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text css={{ color: '$accents7' }}>4 Following</Text>
          <Text css={{ color: '$accents7' }}>97.1K Followers</Text>
        </Card.Footer>
      </Card>
    </div>
  );
}

