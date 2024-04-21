"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { Button } from "@/components/ui/button";

type Props = {};

export default function CompanionCardFlush({}: Props) {
	return (
		<div className="w-full max-w-[72rem] pt-40 pb-12">
			<div className="flex items-center justify-start gap-4">
				<div className="flex flex-col items-center justify-center gap-2">
					<h1 className="text-4xl font-bold text-foreground">Companion Modes</h1>
					<h2 className="text-foreground">
						Choose from any of the three companion modes to interact and learn more
						about the Pokémon universe in a unique and engaging way. Your smart
						companion is tailored to answer your questions with Pokémon
						contextualization, providing the most accurate and helpful responses
						possible.
					</h2>
					<div className="py-4 flex flex-col lg:flex-row items-center justify-center w-full gap-4 mx-auto px-8">
						<Card title="Hybrid Mode" description={"Looking to chat and speak to a Poké-companion? Hybrid mode serves best of both worlds and allows for interchangable conversations between voice and text."} cta={"Converse"} >
							<CanvasRevealEffect
								animationSpeed={3}
								containerClassName="bg-black"
								colors={[
									[236, 72, 153],
									[232, 121, 249],
								]}
								dotSize={2}
							/>
							<div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/20" />
						</Card>
						<Card title="Chat Mode" description={"Want to chat with a Poké-companion? Chat mode is the easiest way to type questions and get answers back quickly with minimal delay."} cta={"Message"} >
							<CanvasRevealEffect
								animationSpeed={5.1}
								containerClassName="bg-emerald-900"
							/>
              <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/20" />
						</Card>
						<Card title="Voice Mode" description={"Prefer to speak with a Poké-companion? Voice mode allows you to ask questions and get answers back in real-time with the power of your voice."} cta={"Speak"} >
							<CanvasRevealEffect
								animationSpeed={3}
								containerClassName="bg-sky-600"
								colors={[[125, 211, 252]]}
							/>
              <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/20" />
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

const Card = ({
	title,
	children,
  description,
  cta,
}: {
	title: string;
  description: string;
  cta: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className="rounded-xl overflow-clip border border-black/[0.2] group/canvas-card flex items-center justify-center max-w-[34%] w-full mx-auto p-4 relative max-h-[34%]"
		>

			<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="h-full w-full absolute inset-0"
					>
            {children}
					</motion.div>
			</AnimatePresence>

			<div className="relative z-20 p-5 drop-shadow-xl">
				<h1 className="text-2xl relative z-10 font-bold text-white transition duration-200 =drop-shadow-2xl">
					{title}
				</h1>
        <h2 className="text-sm text-white drop-shadow-2xl mt-1">{description}</h2>
				<Button variant="secondary" className="mt-3 drop-shadow-2xl">
					{`${cta} -->`}
				</Button>
			</div>
		</div>
	);
};