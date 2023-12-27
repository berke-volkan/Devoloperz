import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: "this_is_magic_key",
    baseURL: "https://api.cortexai.io",
});

export async function POST(req: Request) {
    try {
        // Parse JSON body directly in the destructuring assignment
        const { messages } = await req.json();

        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
                { role: "user", content: messages },
            ],
            temperature: 0,
        });

        // Return the content directly from the response
        return NextResponse.json(response.choices[0].message.content);
        
    } catch (error) {
        console.error("[api_err]", error);
        // Instead of a generic "Internal Error," you might want to include more information
        // in the response, such as the error message.
        return new NextResponse("Internal Error", { status: 500 });
    }
}
