import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TextToVoice } from "./TextToVoice";

type Props = {
	user: boolean;
	message: string;
};

export default function ChatMessage({ user = true, message }: Props) {
	return (
    <div className={cn("w-full flex items-center", user ? "justify-end" : "justify-start")}>
		<div className="flex justify-center items-center gap-2 bg-white p-2 rounded-md border-zinc-300 border-2">
			{user ? (
				<Avatar>
					<AvatarImage src="https://github.com/lryanle.png" />
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
			) : (
				<Avatar>
					<AvatarImage src="https://github.com/openai.png" />
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
			)}
      {user ? (<p className="text-lg font-semibold">{message}</p>) : (<TextToVoice><p className="text-lg font-semibold">{message}</p></TextToVoice>)}
		</div>
    </div>
	);
}
