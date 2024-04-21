"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Book, Github, SparkleIcon, Sparkles } from "lucide-react";
import { Icons } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Pokémon",
		href: "/pokemon",
		description:
			"View information about Pokémon, including their evolution and moves.",
	},
	{
		title: "Items",
		href: "/items",
		description: "Search for items and view their effects and locations.",
	},
	{
		title: "Locations",
		href: "/locations",
		description:
			"View different locations, regions, and the Pokémon that can be found there.",
	},
	{
		title: "Games",
		href: "/games",
		description:
			"Learn about the different Pokémon games and their generations.",
	},
];

type NavbarProps = {
	pokemonID: number;
};

export const Navbar = ({ pokemonID }: NavbarProps) => {
	// return (
	// 	<div className="sticky">
	// 		<Link href="/">Home</Link>
	// 		<Link href="/card">Card</Link>
	// 		<Link href="/chat">Chat</Link>
	// 	</div>
	// );

	// /Pokédex
	//   -> on click -> /card/:id
	// /card/:id
	// /chat -> /chat/:?id
	// /speak
	// Pokémon (has evolution and moves), Items, Locations

	return (
		<NavigationMenu>
			<NavigationMenuList className="gap-2">
				<NavigationMenuItem className="bg-white hover:bg-opacity-70 hover:drop-shadow rounded-md">
					<NavigationMenuTrigger className="gap-1">
						<Sparkles size={20} strokeWidth={2} />
						<p>Smart Companion</p>
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<Link
										className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
										href="/"
									>
										<Icons.pokeball className="h-6 w-6" />
										<div className="mb-2 mt-4 text-lg font-medium">
											Pokéchat
										</div>
										<span className="text-sm leading-tight text-muted-foreground">
											A trainer's smart companion for any Pokémon related
											information. Developed by{" "}
										</span>
										<Link
											className="text-sm leading-tight text-muted-foreground underline inline-flex"
											href="https://ryanlahlou.com"
										>
											lryanle
										</Link>
									</Link>
								</NavigationMenuLink>
							</li>
							<ListItem href="/companion?mode=hybrid" badge="Experimental" title="Hybrid Talk" sparkle>
								Talk to or message your smart companion interchangably.
							</ListItem>
							<ListItem href="/companion?mode=chat" title="Chat" sparkle>
								Chat to your smart companion through text prompts.
							</ListItem>
							<ListItem href="/companion?mode=voice" title="Voice" sparkle>
								Verbally communicate with your smart companion through voice.
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem className="bg-white hover:bg-opacity-70 hover:drop-shadow rounded-md">
					<NavigationMenuTrigger className="gap-1">
						<Book size={20} strokeWidth={2} />
						<p>Pokédex</p>
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem className="bg-white hover:bg-opacity-70 hover:drop-shadow rounded-md">
					<NavigationMenuLink
						href="https://github.com/lryanle/Pokéchat"
						target="_blank"
						className={navigationMenuTriggerStyle()}
					>
						<Github size={20} strokeWidth={2.25} />
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a"> & { badge?: string; sparkle?: boolean }
>(({ className, title, children, badge, sparkle, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground align-middle",
						className
					)}
					{...props}
				>
					<div className="font-medium leading-none inline-flex rounded-md bg-zinc-100 px-[6px] py-[3px]">
						{sparkle && (
							<span className="mr-1 leading-none text-[#000] no-underline group-hover:no-underline">
								<Sparkles
									size={16}
									strokeWidth={2}
									className="leading-0 inline-flex -translate-y-[1px]"
								/>
							</span>
						)}
						<span className="text-sm">{title}</span>
					</div>
					{badge && (
						<span className="ml-1 rounded-md bg-[#c00] px-1.5 py-0.5 text-xs leading-none text-[#fff] no-underline group-hover:no-underline">
							{badge}
						</span>
					)}
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
