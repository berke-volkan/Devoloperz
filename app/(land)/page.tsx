import LandingContent from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavBar } from "@/components/landing-navbar";
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <Analytics />
    <div className="h-full ">
      <LandingNavBar/>
      <LandingHero/>
      <LandingContent/>
    </div>
  )
}

