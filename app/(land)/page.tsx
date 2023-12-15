import LandingContent from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavBar } from "@/components/landing-navbar";
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <div className="h-full">
      <Analytics />
      <LandingNavBar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
