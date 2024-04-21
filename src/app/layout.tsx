import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pokechat",
	description: "(DR04) Pokechat — bridging the gap between humans and Pokémon",
  icons: [
    
  ],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
      <title>Pokechat</title>
      <link rel="icon" href="/favicon.png" />
			<body className={inter.className}>
        <NavbarWrapper pokemonID={0} />
				{children}
			</body>
		</html>
	);
}
