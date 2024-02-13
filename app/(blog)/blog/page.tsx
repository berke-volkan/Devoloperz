/**
 * v0 by Vercel.
 * @see https://v0.dev/t/w3pV7gEv8Ah
 */
"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ConvertkitEmailForm from "@/components/email"
import { useRouter } from "next/navigation"

export default function Component() {
  const router = useRouter();
  router.push("/")
}



    {/* 
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            alt="Coding environment"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="310"
            src=""
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4 text-white">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                Supercharge Your Development Skills
              </h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl">
                Take your coding skills to the next level with our developer-focused resources and tools.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <ConvertkitEmailForm/>
              <p className="text-xs text-gray-300">
                By subscribing you agree to our
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    */}
