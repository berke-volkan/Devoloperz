"use client";
import * as z from "zod"
import { Heading } from "@/components/heading"
import { AtomIcon, Code, ImageIcon, Loader, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { FormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/empty";
import LoaderNesia from "@/components/loader";
import { cn } from "@/lib/utils";
// Other imports...
import { OpenAI } from 'openai';

const openai = new OpenAI({
apiKey: "sk-61B0p5iYw4YKZwY20fmOAp4qxQtT4TLb)",
baseURL: 'https://api.h10.pro'
})
const msg: string[] = [];
const CınversationPage = () => {
    const Router=useRouter();
    const form=useForm<z.infer<typeof FormSchema>>({
        resolver:zodResolver(FormSchema),
        defaultValues:{
            prompt:""
        }
    })
    const isLoading =form.formState.isSubmitting
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
  try {
    const message = values.prompt;
    msg.push(message);

    // Use OpenAI for chat completions
    const response = await openai.chat.completions.create({
  model: 'gpt-4-1106-preview', // Add the model property
  max_tokens: 4096,
  temperature: 1,
  top_p: 0,
  frequency_penalty: 0,
  presence_penalty: 0,
  stream: false,
  messages: [
    { role: "user", content: message },
  ],
});


    const generatedText = response.choices[0].message.content;
    console.log(generatedText);
  } catch (error) {
    console.error('Error in API request:', error);
  } finally {
    Router.refresh();
  }
};

    
    return(
        <div>
            <Heading
            title="İmagine"
            description="The only limit is your creativity"
            icon={AtomIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                        <FormField
                        name="prompt"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                <Input className="border-0 outline-none focus-visible: ring-0 focus-visible: ring-transparent" disabled={isLoading} placeholder="How con ı create a snake game in python?" {...field}/>
                                </FormControl>
                            </FormItem>
                        )}
                        /> 
                        <Button className="col-span-12 lg:col-span-2 w-full"disabled={isLoading}>
                            İmagine!
                        </Button>
                     </form>             
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                      <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <LoaderNesia/>
                      </div>  
                    )}
                    {msg.length ===0 && !isLoading && (
                        <Empty 
                        label="Not imagined yet."/>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {msg.map((message, index) => (
                            <div 
                            key={message}
                            className={cn("p-8 w-full flex item-start gap-x-8 rounded-lg")}
                            >
                            {message}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default CınversationPage
