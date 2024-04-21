import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import axios from 'axios';
// import {CHAT_API} from '../AppConfig';

type ChatFormProps = {
	setSearchResults: string;
};

export const ChatForm = ({ setSearchResults }: ChatFormProps) => {
	// const chat = (query: string) => {
	// 	// AXIOS GET on the POKECHAT API POINT
	// };

	return (
		<div className="chat">
			<Input
				placeholder="Ask me a Pokemon Question..."
			/>
			{/* <Label pointing="above" message="strongest pokemon limit 1">
				{" "}
				Strongest Pokemon{" "}
			</Label>
			<Label pointing="above" message="weakest pokemon limit 1">
				{" "}
				Weakest Pokemon{" "}
			</Label>
			<Label pointing="above" message="starter pokemon limit 3">
				{" "}
				Starter Pokemon{" "}
			</Label> */}
		</div>
	);
};
