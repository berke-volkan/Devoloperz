"use client"
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  AtomIcon,
  Code,
  Code2Icon,
  ImageIcon,
  InfoIcon,
  LayoutDashboard,
  LinkIcon,
  MessageSquare,
  MusicIcon,
  Settings,
  SettingsIcon,
  Swords,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser ,useSession} from "@clerk/nextjs";

// Define Montserrat font face
const montserrat = Montserrat({
  weight: ["600"],
  subsets: ["latin"],
});

// Extract the CSS class from the font face
const montserratClass = montserrat.className;
const mod_routes = [
  {
    label:"Blog",
    icon:SettingsIcon,
    href:"/blog-adm",
    color:"text-red-700",
  },
  {
    label:"User Management",
    icon:SettingsIcon,
    href:"/user-management",
    color:"text-red-700",
  }
]
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label:"Announcements",
    icon:InfoIcon,
    href:"/devz-announcement",
    color:"text-green-700",
  },
  {
    label: "Chat Room",
    icon: MessageSquare,
    href: "/chat",
    color: "text-green-700",
  },
  {
    label: "Devz.Ai",
    icon: AtomIcon,
    href: "/devz-ai",
    color: "text-yellow-700",
  },
  {
    label: "Link",
    icon: LinkIcon,
    href: "/l",
    color: "text-violet-700",
  },
  {
    label: "Rooms",
    icon: Code2Icon,
    href: "/rooms",
    color: "text-red-700",
  },
  {
    label: "Minigames",
    icon:Swords,
    href: "/minigames",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
function checkUserRole(session:any) {
  if (
    !session ||
    !session.user ||
    !session.user.organizationMemberships ||
    session.user.organizationMemberships.length === 0
  ) {
    return null; // Return null if the user is not a basic member
  }

  const organizationMemberships = session.user.organizationMemberships;

  // Loop through all organization memberships
  for (const membership of organizationMemberships) {
    if (membership.role) {
      return membership.role.toLowerCase(); // Return the role in lowercase if it exists
    }
  }

  return null; // Return null if no role is found in the memberships
}
const Sidebar = () => {
  const { session } = useSession();
  const  userRole = checkUserRole(session);
  const pathname = usePathname();
  const user = useUser();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill src="/logo.png" alt="logo" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserratClass)}>Devoloperz</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                route.href === pathname ? "bg-white/10 text-white" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
          {String(user.user?.id) === "user_2YiyVcOKsa4Jb8D8DNP2ZvZeo6A" && (
            <h1>
              Bilgi: Şuanda test kullanisindasiniz. Bu kullanici test bitince silinecek
            </h1>
          )}
        </div>
        {String(user.user?.lastName) === "Admin" && (
          /* Placeholder for additional content for the second user */
          <div>
            ADM
            {mod_routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                route.href === pathname ? "bg-white/10 text-white" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
