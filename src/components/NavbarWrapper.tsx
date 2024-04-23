import React from "react";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

type Props = {
	pokemonID: number;
};

export default function NavbarWrapper({ pokemonID }: Props) {
	return (
		<nav className="w-full fixed top-0 bg-black backdrop-blur shadow-2xl bg-opacity-80 drop-shadow py-4 mb-4 flex flex-row items-center justify-center z-50">
			<div className="flex flex-row items-center justify-between w-full max-w-[72rem] px-6">
				<Link href="/" passHref className="flex flex-row items-center justify-center gap-2">
					<Image src="/favicon.png" alt="Pokechat icon" width={48} height={48} />
					<div className="flex flex-col items-start justify-center text-white gap-0.5">
						<p className="text-2xl font-bold opacity-90 leading-none">Pokéchat</p>
						<p className="opacity-60 text-xs leading-none">A Trainer's Smart Companion</p>
					</div>
				</Link>
				<Navbar pokemonID={0} />
			</div>
		</nav>
	);
}
