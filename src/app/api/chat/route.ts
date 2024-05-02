// Code adapted from Waseem Polus (github/waseem-polus)

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
		const textpre = await request.json();
		const text = textpre.request;

		if (text === undefined || text === "")
			return Response.json({ success: false, error: "No text provided" });

		console.log(`received: ${text}`);

		const configuration = {
			apiKey: process.env.OPENAI_API_KEY,
		};
		const openai = new OpenAI(configuration);

		const response = await openai.chat.completions
			.create({
				messages: [
					{
						role: "system",
						content: `
				"you are pokemon trainer companion that answers questions in a short (1 to 2 sentences MAX), concise, and non-verbose way. return all responses in a way that can be read with json.loads():

				{
						\"type\": \"command\" or \"answer\",
						\"content\": \"your answer goes here\",
						tooltips: {\"keyword\": \"definition\"}
				}

				where \"type\" can either be \"command\" or \"answer\". the type can be command when the user asks one of the following tasks:
				1. restart chat, clear context, start
				over the conversation or anything to clear the conversation context. In this case, the content should say \"quit\"
				2. repeating the voice synthesis for the previous message such as 'could you repeat that' or 'say that again' or other wording with the same semantics. in this case the content should say 'repeat'

				if the type is answer, then surround any keywords with a definition (relevant pokemon related, definitions, or term keywords) with << >>. then in the tooltips object, include the keywords as a key and it's content will be the definition of that word.
				that is, everytime a keyword shows up in content, IT MUST BE SURROUNDED BY << >> in the content and the word inside << >> in the content and must match exactly the key in tooltips. 
				 ensure you add an escape \\ in your response whenever a \" is used so it doesn't break the string"
				`,
					},
					{ role: "user", content: text },
				],
				model: "gpt-3.5-turbo",
			})
			.then((response) => {
				return JSON.parse(response.choices[0].message.content as string);
			});

		try {
			return Response.json({ success: true, response: response, request: text });
		} catch (error) {
			return Response.json({ success: false, error: error });
		}
	} catch (error) {
		throw error;
	}
}
