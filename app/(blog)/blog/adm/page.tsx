"use client"
import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Route = 'dashboard' | 'general-chat' | 'image' | 'video';

const ADM: FC = () => {
  const [adminPanelVisible, setAdminPanelVisible] = useState<boolean>(false);
  const [uname, setUname] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [selectedRoute, setSelectedRoute] = useState<Route>('dashboard');
  
  const { pathname } = useRouter();

  useEffect(() => {
    const route = pathname.split('/')[1] as Route;
    setSelectedRoute(route || 'dashboard');
  }, [pathname]);

  const handleRouteClick = (route: Route) => {
    setSelectedRoute(route);
  };

  const handleLogin = () => {
    // Burada gerçek bir kontrol mekanizması olmalı
    if (uname === "admin" && pass === "password") {
      setAdminPanelVisible(true);
    }
  };

  return (
    <div className="w-full items-center px-7 py-14">
      {adminPanelVisible ? (
        <div className="w-full text-center text-muted-foreground text-3xl">
          Hello admin!
          <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
            <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
              <div className="px-3 py-2 flex-1">
                <div className="flex items-center pl-3 mb-14">
                  <div className="relative w-8 h-8 mr-4">
                    <Image fill src="/logo.png" alt="logo"/>
                  </div>
                  <h1 className="text-2xl font-bold">Undot</h1>
                </div>
                <div className="space-y-1">
                  <button onClick={() => handleRouteClick('dashboard')}>
                    Main Page
                  </button>
                  <button onClick={() => handleRouteClick('general-chat')}>
                    User Management
                  </button>
                  <button onClick={() => handleRouteClick('image')}>
                    Blog Management
                  </button>
                  <button onClick={() => handleRouteClick('video')}>
                    Join requests
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="w-full align-middle border-2 bg-black text-white placeholder-white"
            placeholder="UNAME"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
          <input
            type="password"
            className="w-full align-middle border-2 my-14 bg-black text-white placeholder-white"
            placeholder="PASS"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            className="w-full align-middle border-2 bg-black text-white"
            onClick={handleLogin}
          >
            LOGIN
          </button>
        </>
      )}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
          <div className="px-3 py-2 flex-1">
            <div className="flex items-center pl-3 mb-14">
              <div className="relative w-8 h-8 mr-4">
                <Image fill src="/logo.png" alt="logo"/>
              </div>
              <h1 className="text-2xl font-bold">Undot</h1>
            </div>
            <div className="space-y-1">
              {selectedRoute === 'dashboard' && (
                <div>
                  <h2>Main Page Content</h2>
                  {/* İlgili dashboard içeriği buraya eklenebilir */}
                </div>
              )}
              {selectedRoute === 'general-chat' && (
                <div>
                  <h2>User Management Content</h2>
                  {/* İlgili user management içeriği buraya eklenebilir */}
                </div>
              )}
              {selectedRoute === 'image' && (
                <div>
                  <h2>Blog Management Content</h2>
                  {/* İlgili blog management içeriği buraya eklenebilir */}
                </div>
              )}
              {selectedRoute === 'video' && (
                <div>
                  <h2>Join Requests Content</h2>
                  {/* İlgili join requests içeriği buraya eklenebilir */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADM;
