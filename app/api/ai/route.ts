import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey = "AIzaSyDlbGFTXcs6Q6j1os0zh0Ggu9pzCDBBCOM";
if (apikey == null) {
    throw new Error("GENERATIVE_AI_API_KEY is not set");
}

// Debugging: Log the API key (remove this in production)
console.log("Using API Key:", apikey);
const genAI=new GoogleGenerativeAI(apikey);


export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(messages);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json(text);
        
    } catch (error) {
        console.error("[api_err]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
