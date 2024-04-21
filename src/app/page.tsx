import Image from "next/image";

export default function Home() {
	return (
		<div>
			<div className="w-full h-[45rem] pt-48 bg-pokemon-red bg-center bg-no-repeat bg-cover text-white">
        {/* Landing inspiration from gh:ruivergani/lp-pokemon */}
				<div className="flex flex-col items-center gap-2 py-8 md:py-12 md:pb-8">
					<h1 className="text-center text-balance">
						<span className="text-3xl md:text-6xl tracking-wide">Introducing{" "}</span>
            <span className="text-3xl font-bold md:text-6xl">Pokéchat</span>
					</h1>
					<h2 className="max-w-[72rem] text-center text-lg sm:text-xl">
						The helpful poké-companion nobody asked for but always needed
					</h2>
					<div className="flex flex-col items-center justify-center animate-spring p-1">
						<Image
							src="/lighting.svg"
							alt="lighting"
							className="translate-y-[3rem]"
							width={170}
							height={58}
							quality={100}
						/>
						<Image
							src="/pokeball-red.png"
							alt="pokeball"
							className="translate-y-[3rem]"
							width={798}
							height={514}
							quality={100}
						/>
					</div>
				</div>
			</div>
			<div className="w-full h-[45rem] text-white bg-[#EFF3F6]">{/* about */}</div>
			{/* <Segment raised stacked color='red'>
        <Header as="h1">Welcome to the Pokeverse!</Header>
        <Header as="h1"></Header>
        <Link to="/card">
          <Button primary animated>
            <Button.Content visible>Let's GO!</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Link>
      </Segment> */}
		</div>
	);
}
