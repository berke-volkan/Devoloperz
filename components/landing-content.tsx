import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";

export default function App() {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-xs bg-white shadow-md">
        <CardHeader className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <Avatar isBordered size="lg" src="/logo.png" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Zoey Lang</h4>
              <h5 className="text-sm text-gray-500">@zoeylang</h5>
            </div>
          </div>
          <Button
            className={isFollowed ? "bg-transparent text-blue-600 border-blue-600" : "bg-blue-600 text-white"}
            auto
            flat={isFollowed}
            onClick={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
        <CardBody className="p-4">
          <p className="text-sm text-gray-600">
            Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
          </p>
          <div className="pt-4 flex items-center space-x-2">
            <span className="text-sm text-gray-600">#FrontendWithZoey</span>
            <span className="text-lg" role="img" aria-label="computer">💻</span>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-1">
            <p className="text-sm font-semibold text-gray-600">4</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
          <div className="flex items-center space-x-1">
            <p className="text-sm font-semibold text-gray-600">97.1K</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
