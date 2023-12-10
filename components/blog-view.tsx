."use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials=[
    {
        name:"Post title",
        title:"Writer of the post",
        description:"Short desc.",
        href:"/view",
    },    {
        name:"Post title",
        title:"Writer of the post",
        description:"Short desc.",
        href:"/view",
    },    {
        name:"Post title",
        title:"Writer of the post",
        description:"Short desc.",
        href:"/view",
    },    {
        name:"Post title",
        title:"Writer of the post",
        description:"Short desc.",
        href:"/view",
    },    {
        name:"Post title",
        title:"Writer of the post",
        description:"Short desc.",
        href:"/view",
    },    {
        name:"Post title",
        title:"Writer of the post",
        description:"Short desc.",
        href:"/view",
    },    {
        name:"Post title",
        title:"Writer of the post",
        description:"Short desc.",
        href:"/view",
    },
    {
        name:"Post title",
        title:"Writer of the post",
        description:"Short desc.",
        href:"/view",
    },
]

export const BlogView = () => {
    return(
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold  mb-10">
                Our blog posts 
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {testimonials.map((item)=>(
                    <Link href={item.href} key={item.description}>
                      <Card key={item.description} className="bg-[#192339] border-none text-white" >
                        <CardHeader>
                            <CardTitle className="flex items-center  gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                      </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogView
