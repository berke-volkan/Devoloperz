import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI=new GoogleGenerativeAI("AIzaSyD4eoc6VLKzxvmOUcc1m9YvA4wdqqDeIFY");

const openai = new OpenAI({
    apiKey: "sk-765117771683201035-INLR5939YJ",
    baseURL: "https://api.cortexai.io",
});

export async function POST(req: Request) {
    try {
        // Parse JSON body directly in the destructuring assignment
        const { messages } = await req.json();
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(messages);
        const response = await result.response;
        const text = response.text();

        // Return the content directly from the response
        return NextResponse.json(text);
        
    } catch (error) {
        console.error("[api_err]", error);
        // Instead of a generic "Internal Error," you might want to include more information
        // in the response, such as the error message.
        return new NextResponse("Internal Error", { status: 500 });
    }
}
