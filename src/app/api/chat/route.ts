import axios from "axios";
import { NextRequest } from "next/server";
import { OpenAI } from "openai";

type Data = {
	success: boolean;
	data?: any[];
	error?: string;
};

export async function POST(request: Request) {
	try {
		// get json data from body
		const textpre = await request.json();
		const text = textpre.request

		if (text === undefined || text === "") return Response.json({ success: false, error: "No text provided" });

		console.log(`received: ${text}`)

		// Configuration for OpenAI API
		const configuration = {
			apiKey: process.env.OPENAI_API_KEY,
		}
		const openai = new OpenAI(configuration);

		// Sending the prompt to OpenAI's GPT-3.5 model
		const response = await openai.chat.completions.create({
			messages: [{ role: "system", content: `${text}` }],
    	model: "gpt-4-turbo",
		}).then((response) => {
			return response.choices[0].message.content;
		})

		try {
			return Response.json({ success: true, response: response, request: text });
		} catch (error) {
			return Response.json({ success: false, error: error });
		}
	} catch (error) {
		throw error;
	}
}
