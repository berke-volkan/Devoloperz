"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {useTheme} from "next-themes"

const font = Montserrat({
    weight:"600",
    subsets: ["latin"]
})

export const LandingNavBar = () => {
    const { isSignedIn } = useAuth();
    const {theme,setTheme} = useTheme();
    return(
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href={"/"} className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image
                    fill
                    src={"/logo.png"}
                    alt="logo"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white",font.className)}>
                  Devoloperz
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={"/submission"}>
                    <Button variant={"outline"} className="rounded-full">
                        Submission Form
                    </Button>
                </Link>
                <Link href="/blog">
                    <Button variant={"outline"} className="rounded-full ">
                        Our blog
                    </Button>
                </Link>
                <span>
                    <span onClick={()=> setTheme("dark")}>
                      Dark
                    </span>|
                    <span onClick={()=> setTheme("light")}>
                        Light
                    </span>| ({theme})
                </span>
            </div>
        </nav>
    )
}