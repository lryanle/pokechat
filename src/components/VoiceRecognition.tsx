// Code adapted from Waseem Polus (github/waseem-polus)

"use client";

import React, { useState, useEffect } from "react";

type VoiceRecognition = {
	listen: () => void;
	transcript: string;
	isListening: boolean;
  stopListening: () => void;
	clearTranscript: () => void;
};

export const useVoiceRecognition = (): VoiceRecognition => {
	const [isListening, setIsListening] = useState<boolean>(false);
	const [transcript, setTranscript] = useState<string>("");
	const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout>();

	const listen = () => {
		setIsListening(true);
	};

	const stopListening = () => {
		setIsListening(false);
	};

	const clearTranscript = () => {
		setTranscript("");
	};

	useEffect(() => {
		const SpeechRecognition =
			(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

		const recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;

		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const currentTranscript = Array.from(event.results)
				.map((result: any) => result[0])
				.map((result) => result.transcript)
				.join("");
			setTranscript(currentTranscript);
		};

		recognition.onend = () => {
			stopListening();
		};

		if (isListening) {
			recognition.start();
		} else {
			recognition.stop();
		}

		return () => {
			recognition.stop();
		};
	}, [isListening]);

	useEffect(() => {
		if (transcript.length > 0) {
			clearTimeout(silenceTimer);
			setSilenceTimer(setTimeout(() => stopListening(), 2000));
		}
	}, [transcript]);

	return { listen, transcript, isListening, stopListening, clearTranscript };
};

export const speak = (
	text: string,
	setIsTalking: (status: boolean) => void,
	onEnd: () => void = () => {}
) => {
	const synth = window.speechSynthesis;
	const utterance = new SpeechSynthesisUtterance(text.replace("<<", "").replace(">>", ""));

	utterance.onstart = () => {
		setIsTalking(true);
	};

	utterance.onend = () => {
		setIsTalking(false);
		onEnd();
	};

	synth.speak(utterance);
};
