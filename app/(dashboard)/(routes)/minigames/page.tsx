import { Heading } from '@/components/heading';
import { Swords } from 'lucide-react';
import { Empty } from '@/components/empty';
import {Spacer} from "@nextui-org/spacer"

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
          id="embededGame1" 
          src="https://idev.games/embed/sillysnake" 
          scrolling="no" 
          seamless
          frameBorder="0" 
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
        >
          Browser not compatible.
        </iframe>
      <Spacer x={4} />
      </div>
      {/* iDev.Games Responsive Embed Code for Catch-Em-All */}
      <div style={{ position: 'relative', height: '0', overflow: 'hidden', paddingBottom: '56.25%' }}>
        <iframe 
          id="embededGame2" 
          src="https://idev.games/embed/catch-em-all" 
          scrolling="no" 
          frameBorder="0" 
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
        >
          Browser not compatible.
        </iframe>
      </div>
      {/* Düzeltme yapılan kısım */}
      <iframe frameBorder="0" src="https://itch.io/embed-upload/8400802?color=333333" allowFullScreen="" width="640" height="380"><a href="https://mygamelab.itch.io/spaceship">Play SpaceShip on itch.io</a></iframe>
      {/* End Embed Code */}
    </div>
  );
};

export default Sidebar;
