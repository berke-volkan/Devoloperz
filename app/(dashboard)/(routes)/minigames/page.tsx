
import { Heading } from '@/components/heading';
import { CodeIcon, SettingsIcon, Swords } from 'lucide-react';
import { Empty } from '@/components/empty';

const Sidebar = () => {

  
  return (
    <div className="container mx-auto p-4">
      <Heading
        title="Minigames!"
        description="Lets have fun!"
        icon={Swords}
        bgColor="bg-red-700/10"
      />
      {/* iDev.Games Responsive Embed Code for SillySnake */}
      <div style={{ position: 'relative', height: '0', overflow: 'hidden', paddingBottom: '56.25%' }}>
        <iframe 
          id="embededGame" 
          src="https://idev.games/embed/sillysnake" 
          scrolling="no" 
          seamless
          frameBorder="0" 
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
        >
          Browser not compatible.
        </iframe>
      </div>
      <div style={{ position: 'relative', height: '0', overflow: 'hidden', paddingBottom: '56.25%' }}>
          <iframe id="embededGame" src="https://idev.games/embed/catch-em-all" scrolling="no"  frameBorder="0" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></iframe>Browser not compatible.</iframe>
m     </div>
      {/* End Embed Code */}
    </div>
  );
};

export default Sidebar;
