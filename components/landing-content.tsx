import React, { useState } from "react";
import { Card, Avatar, Button } from "@nextui-org/react";

export default function App() {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ maxWidth: "400px", backgroundColor: '#fff' }}>
        <Card.Header style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar bordered src="/logo.png" />
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>Zoey Lang</p>
              <p style={{ color: '#888' }}>@zoeylang</p>
            </div>
          </div>
          <Button
            ghost={!isFollowed}
            color="primary"
            onClick={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </Card.Header>
        <Card.Body style={{ padding: '1rem' }}>
          <p style={{ color: '#666' }}>
            Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
          </p>
          <p style={{ color: '#666', marginTop: '1rem' }}>
            #FrontendWithZoey 💻
          </p>
        </Card.Body>
        <Card.Footer style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#888' }}>4 Following</p>
          <p style={{ color: '#888' }}>97.1K Followers</p>
        </Card.Footer>
      </Card>
    </div>
  );
}

