import BlogView from "@/components/blog-view";
import LandingContent from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavBar } from "@/components/landing-navbar";


export default function Home() {
  return (
    <div className="h-full ">
      <LandingNavBar/>
      <BlogView/>
    </div>
  )
}
