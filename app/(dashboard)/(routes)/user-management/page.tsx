"use client";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Heading } from '@/components/heading';
import { CodeIcon, Settings2, SettingsIcon } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const user = useUser();

  return (
    <div className="container mx-auto p-4">
      {String(user.user?.id) === "user_2YiyVcOKsa4Jb8D8DNP2ZvZeo6A" && (
        <h1>
          Bilgi: Şuanda test kullanisindasiniz. Bu kullanici test bitince silinecek
        </h1>
      )}
      {String(user.user?.lastName) === "Admin" && (
        <div className="container mx-auto p-4">
          <Heading
            title="Manage Members"
            description="Manage Members easily!"
            icon={SettingsIcon}
            iconColor="text-red-700"
            bgColor="bg-red-700/10"
          />
          <div className="flex items-center space-x-4">
            <label>
              Kullanicilar Clerk ile yönetilmektedir.Clerke yönlendirilmek için yandaki butona tiklayiniz
            </label>
            <a href="https://clerk.com" target="_blank">
            <button onClick={() => {}} className="p-2 bg-blue-500 text-white rounded-lg">
              Clerk
            </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
