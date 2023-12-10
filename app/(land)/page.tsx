import LandingContent from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavBar } from "@/components/landing-navbar";
import { ThemeProvider } from "next-themes";


export default function Home() {
  return (
    <ThemeProvider attribute="class">
    <div className="h-full ">
      <LandingNavBar/>
      <LandingHero/>
      <LandingContent/>
    </div>
    </ThemeProvider>
  )
}
