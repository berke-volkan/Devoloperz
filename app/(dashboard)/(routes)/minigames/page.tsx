"use client"
import { Heading } from '@/components/heading';
import { Swords } from 'lucide-react';
import { Empty } from '@/components/empty';
import {Spacer} from "@nextui-org/spacer"
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { useState } from 'react';

const Sidebar = () => {
  const [game,SetGame]=useState(99)
  return (
    <div className="container mx-auto p-4">
      <Heading
        title="Minigames!"
        description="Lets have fun!"
        icon={Swords}
        bgColor="bg-red-700/10"
      />
      <button className='bg-black text-white rounded-lg mb-5'onClick={()=>(SetGame(0))} style={{height:"70px",width:"70px"}}>Spaceship</button>
      <button className='bg-black text-white rounded-lg mb-5  ml-5'onClick={()=>(SetGame(1))} style={{height:"70px",width:"70px"}}> Silly Snake</button>
      <button className='bg-black text-white rounded-lg mb-5 ml-5'onClick={()=>(SetGame(2))} style={{height:"70px",width:"70px"}}> Chess </button>
      <button className='bg-black text-white rounded-lg mb-5 ml-5'onClick={()=>(SetGame(3))} style={{height:"70px",width:"70px"}}> Sudoku</button>
      <button className='bg-black text-white rounded-lg mb-5 ml-5'onClick={()=>(SetGame(4))} style={{height:"70px",width:"70px"}}> Color Sort</button>
      {game==0 &&
      <iframe frameBorder="0" src="https://itch.io/embed-upload/8400802?color=333333" width="640" height="380"><a href="https://mygamelab.itch.io/spaceship">Play SpaceShip on itch.io</a></iframe>}
      {game==1 && 
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
        </div>
      }
      {game==2 &&<iframe src="https://fritz.chessbase.com" style={{width:"760px",height:"480px"}}></iframe>}
      {game==3 && <iframe  scrolling="no" src="https://mczak.com/code/sudoku/suframe/" style={{border:"0px solid #eee",overflow:"hidden",width:"400px",height:"500px"}} width="400"></iframe>}
      {game==4 && <iframe src="https://www.bubbleshooter.net/games/water-color-sort/"  scrolling="no" width="800" height="600" ></iframe>}
      {game==99 && <Empty label="Select a game to play"/>}
    </div>
  );
};

export default Sidebar;
