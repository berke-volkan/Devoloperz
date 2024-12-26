"use client";
import * as z from "zod"
import { Heading } from "@/components/heading"
import { AtomIcon, Bot, Code, ImageIcon, Loader, MessageSquare } from "lucide-react"
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
import { BotAvatar } from "@/components/bot-avatar";
import {UserAvatar} from "@/components/user-avatar";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import { Badge } from "@nextui-org/badge";
import {Spacer} from "@nextui-org/spacer";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const ConversationPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        prompt: "",
      },
    });
  
    const isLoading = form.formState.isSubmitting;
    const [msg, setMsg] = useState<string[]>([]);
  
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
          let message = data.prompt;
          console.log(message); // Corrected: Log the 'message' variable
      
          const response = await axios.post("/api/ai", {
            messages: message,
          });
      
          setMsg((prevMsg) => [...prevMsg, message, response.data]);
      
          form.reset();
        } catch (error) {
          console.error("[api_err]", error);
      
          // Handle errors appropriately, e.g., show a user-friendly message
        } finally {
          form.reset();
          router.refresh();
        }
      };
      
  
    return (
      <div>
        
        <Heading
          title="Devz-Ai"
          description="Create your apps faster with AI! Powered by Cortex"
          icon={AtomIcon}
          iconColor="text-yellow-700"
          bgColor="bg-yellow-700/10"
        />
        <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible: ring-0 focus-visible: ring-transparent"
                          disabled={isLoading}
                          placeholder="How can I create a snake game in python?"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="col-span-12 lg:col-span-2 w-full"
                  disabled={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Ask!
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <LoaderNesia />
              </div>
            )}
            {msg.length === 0 && !isLoading && <Empty label="No messages yet." />}
            <div className="flex flex-col-reverse gap-y-4">
              {msg.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-8 w-full flex item-start gap-x-8 rounded-lg",
                    index % 2 === 0 ? "bg-white border border-black/10" : "bg-muted"
                  )}
                >
                  {index % 2 !== 0 ? <div>
                    <div>
        <Popover showArrow
      backdrop="blur"
      placement="right"
      classNames={{
        base: [  
          // arrow color
          "before:bg-default-200"
        ],
        content: [
          "py-3 px-4 border border-default-200",
          "bg-blue-500 text-default-100",
          "dark:from-default-100 dark:to-default-50",
        ],
      }}>
          <PopoverTrigger>
        <Badge
          isOneChar
          content={<Bot className="text-green-500" />}
          color="success"
          placement="top-right"
        >
          
          <Spacer x={7} />
        </Badge>
        </PopoverTrigger>
        <PopoverContent>
        <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={90}
          radius="sm"
          src="https://freepnglogo.com/images/all_img/1728457808_Google_Gemini_logo_PNG.png"
          width={90}
        />
        <div className="flex flex-col">
          <p className="text-md">Gemini Pro</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <p>This answer is ai-generated and may contain errors.Please check the important answers</p>
      </CardBody>
      <Divider/>
    </Card>

        </PopoverContent>
        </Popover>
         <BotAvatar/>
        <Spacer x={4}/>
      </div>
                    </div> : <UserAvatar />}
                  <p className="text-sm">{message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConversationPage;
  
