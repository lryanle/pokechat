"use client";
import { VoiceToText } from "@/components/VoiceToText";
import { TextToVoice } from "@/components/TextToVoice";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useVoiceToText, useTextToVoice } from "react-speakup";
import ChatMessage from "@/components/ChatMessage";

type Props = {
	params: { slug: string };
};

type Message = {
	user: boolean;
	message: string;
};

export default function page({ params }: Props) {
	const [text, setText] = useState("");
	const [ans, setAns] = useState("");

	const [messageHistory, setMessageHistory] = useState<Message[]>([]);

	useEffect(() => {
		fetch("/api/chat", {
			method: "POST",
			body: JSON.stringify({ request: text }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					return;
				}
				console.log(data);
				setAns(data.response);
			});
	}, [text]);

	useEffect(() => {
		if (ans !== "") {
			setMessageHistory([...messageHistory, { user: false, message: ans }]);
		}
		setAns("");
	}, [ans]);

	useEffect(() => {
		if (text !== "") {
			setMessageHistory([...messageHistory, { user: true, message: text }]);
		}
		setText("");
	}, [text]);

	const checkLastMessage = () => {
		if (messageHistory.length > 0) {
			return messageHistory[messageHistory.length - 1].user;
		}
		return false;
	};

	return (
		<div className="w-full h-full flex flex-col items-center bg-white">
			<div className="bg-[#c30000] w-full flex items-center pt-16 justify-center">
				<div className="max-w-[72rem] w-full px-6 py-4 flex justify-center items-center">
					<div className="flex flex-col items-center justify-center gap-1">
						<h1 className="text-5xl font-bold text-center text-secondary flex items-center justify-center gap-2">
							<Book className="h-10 w-10" strokeWidth={2.5} />
							<span>Smart Companion</span>
						</h1>
					</div>
				</div>
			</div>
			<div className="w-full h-full flex justify-center items-start max-w-[72rem] p-6">
				<div className="fixed bottom-[2rem]">
					<VoiceToText text={text} setText={setText} />
				</div>
				<div className="w-[50rem] h-full min-h-[60rem] bg-[#e5e7eb] border-zinc-300 border-3 rounded flex flex-col items-center justify-start p-3 gap-2 overflow-y-scroll">
					{messageHistory.map((message, index) => (
						<ChatMessage
							key={`${message + " " + index}`}
							user={message.user}
							message={message.message}
						/>
					))}
				</div>
			</div>
			<div className="flex justify-between items-start flex-1 h-full max-w-[72rem] w-full"></div>
			<div className="h-0 w-0 hidden bg-pokemon-bug bg-pokemon-dark bg-pokemon-dragon bg-pokemon-electric bg-pokemon-fairy bg-pokemon-fighting bg-pokemon-fire bg-pokemon-flying bg-pokemon-ghost bg-pokemon-grass bg-pokemon-ground bg-pokemon-ice bg-pokemon-normal bg-pokemon-poison bg-pokemon-psychic bg-pokemon-rock bg-pokemon-steel bg-pokemon-water"></div>
			<div className="h-0 w-0 hidden drop-shadow-2xl-pokemon-bug drop-shadow-2xl-pokemon-dark drop-shadow-2xl-pokemon-dragon drop-shadow-2xl-pokemon-electric drop-shadow-2xl-pokemon-fairy drop-shadow-2xl-pokemon-fighting drop-shadow-2xl-pokemon-fire drop-shadow-2xl-pokemon-flying drop-shadow-2xl-pokemon-ghost drop-shadow-2xl-pokemon-grass drop-shadow-2xl-pokemon-ground drop-shadow-2xl-pokemon-ice drop-shadow-2xl-pokemon-normal drop-shadow-2xl-pokemon-poison drop-shadow-2xl-pokemon-psychic drop-shadow-2xl-pokemon-rock drop-shadow-2xl-pokemon-steel drop-shadow-2xl-pokemon-water"></div>
			<div className="h-0 w-0 hidden hover:shadow-pokemon-bug hover:shadow-pokemon-dark hover:shadow-pokemon-dragon hover:shadow-pokemon-electric hover:shadow-pokemon-fairy hover:shadow-pokemon-fighting hover:shadow-pokemon-fire hover:shadow-pokemon-flying hover:shadow-pokemon-ghost hover:shadow-pokemon-grass hover:shadow-pokemon-ground hover:shadow-pokemon-ice hover:shadow-pokemon-normal hover:shadow-pokemon-poison hover:shadow-pokemon-psychic hover:shadow-pokemon-rock hover:shadow-pokemon-steel hover:shadow-pokemon-water"></div>
		</div>
	);
}
