"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
    const {isSignedIn} = useAuth();
    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Best Devoloper forum for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <Typewriter 
                    options={{
                        strings: ["Helping","Brain storm","Code sharing"],
                        autoStart: true,
                        loop: true,
                    }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Meet with peoples like you!
            </div>
            <div className="flex justify-center space-x-5">
                <Link href={isSignedIn ? "/dashboard":"/sign-in"} >
                    <Button variant="destructive" className="md:tex-lg  p-4 md:p-6 rounded-full font-semibold">Lets Devolop!</Button>
                </Link>
                <a  href="https://www.producthunt.com/posts/devoloperz?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-devoloperz" target="_blank"><img style={{marginLeft:"20px"}}src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=748813&theme=light&t=1737039513670" alt="Devoloperz - A&#0032;super&#0045;app&#0032;for&#0032;Devolopers&#0046; | Product Hunt"  width="250" height="54" /></a>
                
            </div>
            
            <div className="text-zinc-400 text-xs tmd:text-sm font-normal">
               No toxic Humans.Only inteligience
            </div>
        </div>
    )
}