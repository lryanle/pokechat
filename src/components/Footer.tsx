import { Github, Globe } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
	return (
    <div className="flex justify-center items-center bg-[#EFF3F6]">
		<div className="max-w-[72rem] w-full flex justify-between items-center p-4">
			<p className="text-muted-foreground text-xs font-light">
				© 2025, lryanle. All Rights Reserved.
			</p>
			<div className="flex justify-center items-center gap-2">
				<Link href="https://ryanlahlou.com" target="_blank">
					<Button variant="ghost" size="icon">
						<Globe size={16} />
					</Button>
				</Link>
				<Link href="https://github.com/lryanle" target="_blank">
					<Button variant="ghost" size="icon">
						<Github size={16} />
					</Button>
				</Link>
			</div>
		</div></div>
	);
}
