import LandingContent from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavBar } from "@/components/landing-navbar";


export default function Home() {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
    <div className="mx-auto max-w-screen-xl h-full w-full">
     <div className="h-full">
      <LandingNavBar />
      <LandingHero />
      
     </div>
                </div>
      <LandingContent />
        </main>
  );
}
