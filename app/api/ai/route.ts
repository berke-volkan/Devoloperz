
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: "sk-61B0p5iYw4YKZwY20fmOAp4qxQtT4TLb",
    baseURL: "https://api.h10.pro",
});

export async function POST(req: Request) {
    try {
        const body = await req.json(); // Add await here to properly parse the JSON body
        const messages = body.messages; // Fix here to properly access messages

            const response = await openai.chat.completions.create({
                model: "gpt-4-1106-preview",
                messages: [
                    { role: "user", content: messages }, // Fix the extra double quote here
                ],
                temperature: 0,
            });
            return NextResponse.json(response.choices[0].message.content);
        
    } catch (e) {
        console.log("[api_err]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
