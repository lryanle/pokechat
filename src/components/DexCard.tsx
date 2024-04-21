import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
	title: string;
	description: string;
	cta: string;
	className: string;
};

export default function DexCard({ title, description, cta, className }: Props) {
	return (
		<div className={cn(`rounded-lg bg-gradient-to-b drop-shadow-xl hover:-translate-y-2 hover:drop-shadow-2xl duration-300 transition-all ease-in-out`, className)}>
			<div className="bg-crosshatch w-full h-full px-8 py-4 max-w-96">
				<h1 className="text-2xl font-bold text-foreground">{title}</h1>
				<h2 className="text-foreground">{description}</h2>
				<Button variant="default" className="mt-4">
					{`${cta} -->`}
				</Button>
			</div>
		</div>
	);
}
