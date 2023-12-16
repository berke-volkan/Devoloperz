"use client";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Heading } from '@/components/heading';
import { CodeIcon,SettingsIcon, Swords } from 'lucide-react';
import { Empty } from '@/components/empty';
const Sidebar = () => {
  const pathname = usePathname();
  const user = useUser();

  return (
    <div className="container mx-auto p-4">
        <div className="container mx-auto p-4">
          <Heading
            title="Minigames!"
            description="Lets fun!"
            icon={Swords}
            bgColor="bg-red-700/10"
          />
          <Empty label="Nothing to see yet :(" />
        </div>
    </div>
  );
};

export default Sidebar;
