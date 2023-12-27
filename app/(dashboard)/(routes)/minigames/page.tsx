import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Heading } from '@/components/heading';
import { CodeIcon, SettingsIcon, Swords } from 'lucide-react';
import { Empty } from '@/components/empty';

const Sidebar = () => {
  const pathname = usePathname();
  const user = useUser();
  
  return (
    <div className="container mx-auto p-4">
      <Heading
        title="Minigames!"
        description="Lets have fun!"
        icon={Swords}
        bgColor="bg-red-700/10"
      />
      <Empty label="Nothing to see yet :(" />
      {/* iDev.Games Responsive Embed Code for SillySnake */}
      <div style={{ position: 'relative', height: '0', overflow: 'hidden', paddingBottom: '56.25%' }}>
        <iframe 
          id="embededGame" 
          src="https://idev.games/embed/sillysnake" 
          scrolling="no" 
          seamless="seamless" 
          frameBorder="0" 
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
        >
          Browser not compatible.
        </iframe>
      </div>
      {/* End Embed Code */}
    </div>
  );
};

export default Sidebar;
