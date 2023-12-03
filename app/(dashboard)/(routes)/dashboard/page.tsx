"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, LayoutDashboard, MessageSquare, Music, MusicIcon, Settings, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools=[
  {
    label:"Code Generation",
    icon:Code,
    href:"/code",
    color:"text-green-700",
    bgColor:"bg-green-700/10"
  }
]
export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Explore The Power Of AI!
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat With Smartest AI - Exprerience The Power Of AI!
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card  onClick={()=>router.push(tool.href)}
          key={tool.href}
          className="p-4 border-black/5 items center
          justify-between hover:shadow-md transition cursor-pointer
          "
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("h-8 w-8", tool.color)}/>
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-8 h-8"/>
          </Card>
        ))}
      </div>
    </div>
    
  )
}
