import React from "react";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

type Props = {
	pokemonID: number;
};

export default function NavbarWrapper({ pokemonID }: Props) {
	return (
		<nav className="w-full fixed top-0 bg-black bg-opacity-80 drop-shadow py-4 mb-4 flex flex-row items-center justify-center">
			<div className="flex flex-row items-center justify-between w-full max-w-[72rem]">
				<Link href="/" passHref className="flex flex-row items-center justify-center gap-2">
					<Image src="/favicon.png" alt="Pokechat icon" width={48} height={48} />
					<div className="flex flex-col items-start justify-center text-white">
						<p className="text-2xl font-bold opacity-90 leading-none">Pokechat</p>
						<p className="opacity-60 text-sm leading-none">A Trainer's Smart Companion</p>
					</div>
				</Link>
				<Navbar pokemonID={0} />
			</div>
		</nav>
	);
}
