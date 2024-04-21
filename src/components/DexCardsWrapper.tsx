import React from 'react'
import DexCard from '@/components/DexCard';

type Props = {}

export default function DexCardsWrapper({}: Props) {
  return (
    <div className="w-full max-w-[72rem] py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">Pokédex Features</h1>
        <div className="w-full flex flex-row justify-evenly items-center flex-wrap gap-8">
          <DexCard title={'Pokemon Encyclopedia'} description={'Search for Pokémon and view their stats, abilities, and evolutions.'} cta={'Lookup Pokémon'} className="from-[#ccf997bf] to-[#ccf9eabf]" />
          <DexCard title={'Item Inventory'} description={'Search for items and view their effects and locations.'} cta={'Lookup Items'} className="from-[#a3eff9bf] to-[#98ccffbf]" />
          <DexCard title={'Location Guide'} description={'View different locations, regions, and the Pokémon that can be found there.'} cta={'Lookup Locations'} className="from-[#ffcdffbf] to-[#d0b9f0bf]" />
          <DexCard title={'Games Database'} description={'Learn about the different Pokémon games and their generations.'} cta={'Lookup Games'} className="from-[#f9eaccbf] to-[#f9d9ccbf]" />
        </div>
      </div>
    </div>
  )
}