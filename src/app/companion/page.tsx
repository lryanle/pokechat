"use client";
import { useEffect, useState } from "react";
import { useVoiceRecognition, speak } from "@/components/VoiceRecognition";
import { Button } from "@/components/ui/button";
import { Message, Msg } from "@/components/ChatMessage";
import {
	Book,
	BookA,
	BookAudio,
	BookHeadphones,
	BookMarked,
	BookText,
	BookType,
	BookUser,
	BotMessageSquare,
	Ear,
	EarOff,
	Mic,
	SendHorizonal,
	Square,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
	IconLetterP,
	IconLetterO,
	IconLetterK,
	IconLetterE,
	IconLetterC,
	IconLetterH,
	IconLetterA,
	IconLetterT,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";

type Props = {
	params: { slug: string };
};

type Message = {
	user: boolean;
	message: string;
};

export default function page({ params }: Props) {
	const [chatLog, setChatLog] = useState<Array<Msg>>([]);
	const { listen, transcript, isListening, stopListening, clearTranscript } = useVoiceRecognition();
	const [textInput, setTextInput] = useState("");
	const [isThinking, setIsThinking] = useState<boolean>(false);
	const [isTalking, setIsTalking] = useState<boolean>(false);
	const [autoListen, setAutoListen] = useState<boolean>(true);

	const { toast } = useToast();

	useEffect(() => {
		if (!isListening && transcript !== "") {
			handleSubmission(transcript);
		}
	}, [isListening, transcript]);

	const handleSubmission = (text: string) => {
		setChatLog([...chatLog, { role: "user", content: text }]);

		setIsThinking(true);
		fetch("/api/chat", {
			method: "POST",
			body: JSON.stringify({ request: text }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				return data.response;
			})
			.then((res) => {
				setIsThinking(false);
				setChatLog(prevChatLog => [...prevChatLog, { role: "assistant", ...res }]);

				if (res.type === "answer") {
					speak(res.content, setIsTalking, autoListen ? listen : () => {});
				}
			});
		clearTranscript();
	};

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextInput(event.target.value);
	};

	const handleSubmit = () => {
		if (textInput.trim() !== "") {
			handleSubmission(textInput);
			setTextInput("");
		}
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
			<div className="w-full h-[calc(100vh-9rem)] flex justify-center items-start max-w-[72rem] p-6">
				<section className="h-full flex flex-col flex-grow px-64 justify-start gap-4 pb-16 overflow-y-auto">
					{chatLog.length > 0 || isListening || isThinking ? (
						chatLog.map((msg, i) => (
							<Message key={msg.content + String(i)} message={msg} />
						))
					) : (
						<div className="h-full flex flex-col items-center justify-center gap-2 w-full font-light">
							<div className="flex">
								<IconLetterP
									size={32}
									strokeWidth={2}
									color={"black"}
									className="animate-bounce delay-0"
								/>
								<IconLetterO
									size={32}
									strokeWidth={2}
									color={"black"}
									className="animate-bounce delay-100"
								/>
								<IconLetterK
									size={32}
									strokeWidth={2}
									color={"black"}
									className="animate-bounce delay-200"
								/>
								<IconLetterE
									size={32}
									strokeWidth={2}
									color={"black"}
									className="animate-bounce delay-300"
								/>
								<IconLetterC
									size={32}
									strokeWidth={2}
									color={"black"}
									className="animate-bounce delay-300"
								/>
								<IconLetterH
									size={32}
									strokeWidth={2}
									color={"black"}
									className="animate-bounce delay-200"
								/>
								<IconLetterA
									size={32}
									strokeWidth={2}
									color={"black"}
									className="animate-bounce delay-100"
								/>
								<IconLetterT
									size={32}
									strokeWidth={2}
									color={"black"}
									className="animate-bounce delay-0"
								/>
							</div>
							<p className="text-xl text-zinc-600">Hello! How can I help?</p>
						</div>
					)}
					{isListening && <Message message={{ role: "user", content: transcript }} />}
					{isThinking && (
						<Message
							message={{
								role: "assistant",
								content: "",
								type: "answer",
								tooltips: {},
							}}
							loading
						/>
					)}
				</section>
				<div className="flex justify-center gap-2 py-4 fixed bottom-0 left-0 w-screen z-10 bg-gradient-to-t from-zinc-300 to-transparent">
					<div className="flex justify-center items-center gap-1 bg-primary p-4 rounded-lg">
						<div className="flex justify-center items-center gap-2">
							<Input
								placeholder="Ask me anything..."
								value={textInput}
								onChange={handleTextChange}
								className="max-w-96"
								onKeyPress={(event) => {
									if (event.key === "Enter") {
										handleSubmit();
									}
								}}
							/>
							<Button
								variant="secondary"
								size="icon"
								onClick={handleSubmit}
								className="px-2"
							>
								<SendHorizonal />
							</Button>
						</div>
						<div className="flex justify-center items-center gap-1 mx-4 text-primary-foreground">
							<span>{" or "}</span>
						</div>
						<div className="flex justify-center items-center gap-2">
							{isListening ? (
								<>
									<Button className="gap-2 px-2" onClick={stopListening} variant="secondary">
										<Square />
									</Button>
								<Button className="gap-2" disabled variant="secondary">
										<Ear />
										Listening...
									</Button>
								</>
							) : isTalking || isThinking ? (
								<Button className="gap-2" disabled variant="secondary">
									<BotMessageSquare />
									Answering...
								</Button>
							) : (
								<Button
									className="flex justify-center items-center gap-1"
									onClick={listen}
									variant="secondary"
								>
									<Mic />
									Ask with voice
								</Button>
							)}
							<Button
								onClick={() => {
									toast({
										title: !autoListen ? "Auto listen on" : "Auto listen off",
									});
									setAutoListen(!autoListen);
								}}
								size="icon"
								variant="secondary"
							>
								{autoListen ? <Ear /> : <EarOff />}
							</Button>
						</div>
					</div>
				</div>
				<div className="h-0 w-0 hidden bg-pokemon-bug bg-pokemon-dark bg-pokemon-dragon bg-pokemon-electric bg-pokemon-fairy bg-pokemon-fighting bg-pokemon-fire bg-pokemon-flying bg-pokemon-ghost bg-pokemon-grass bg-pokemon-ground bg-pokemon-ice bg-pokemon-normal bg-pokemon-poison bg-pokemon-psychic bg-pokemon-rock bg-pokemon-steel bg-pokemon-water"></div>
				<div className="h-0 w-0 hidden drop-shadow-2xl-pokemon-bug drop-shadow-2xl-pokemon-dark drop-shadow-2xl-pokemon-dragon drop-shadow-2xl-pokemon-electric drop-shadow-2xl-pokemon-fairy drop-shadow-2xl-pokemon-fighting drop-shadow-2xl-pokemon-fire drop-shadow-2xl-pokemon-flying drop-shadow-2xl-pokemon-ghost drop-shadow-2xl-pokemon-grass drop-shadow-2xl-pokemon-ground drop-shadow-2xl-pokemon-ice drop-shadow-2xl-pokemon-normal drop-shadow-2xl-pokemon-poison drop-shadow-2xl-pokemon-psychic drop-shadow-2xl-pokemon-rock drop-shadow-2xl-pokemon-steel drop-shadow-2xl-pokemon-water"></div>
				<div className="h-0 w-0 hidden hover:shadow-pokemon-bug hover:shadow-pokemon-dark hover:shadow-pokemon-dragon hover:shadow-pokemon-electric hover:shadow-pokemon-fairy hover:shadow-pokemon-fighting hover:shadow-pokemon-fire hover:shadow-pokemon-flying hover:shadow-pokemon-ghost hover:shadow-pokemon-grass hover:shadow-pokemon-ground hover:shadow-pokemon-ice hover:shadow-pokemon-normal hover:shadow-pokemon-poison hover:shadow-pokemon-psychic hover:shadow-pokemon-rock hover:shadow-pokemon-steel hover:shadow-pokemon-water"></div>
			</div>
		</div>
	);
}
