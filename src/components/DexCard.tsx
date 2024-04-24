import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
	title: string;
	description: string;
	cta: string;
	href: string;
	className: string;
	disabled?: boolean;
	badge?: string;
};

export default function DexCard({
	title,
	description,
	cta,
	href,
	disabled,
	badge,
	className,
}: Props) {
	return (
		<div
			className={cn(
				`rounded-lg bg-gradient-to-b drop-shadow-xl hover:-translate-y-2 hover:drop-shadow-2xl duration-300 transition-all ease-in-out`,
				className
			)}
		>
			<div className="bg-crosshatch w-full h-full px-8 py-4 max-w-96">
				<div className="flex jusify-center items-center gap-1">
					<h1 className="text-2xl font-bold text-foreground">{title}</h1>
					{badge && (
						<span className="ml-1 rounded-md px-1.5 py-0.5 text-xs leading-none text-[#fff] no-underline group-hover:no-underline bg-red-600">
							{badge}
						</span>
					)}
				</div>
				<h2 className="text-foreground">{description}</h2>
				<Link href={href}>
					<Button variant="default" className="mt-4" disabled={disabled}>
						{`${cta} -->`}
					</Button>
				</Link>
			</div>
		</div>
	);
}
