import React from 'react'

type Props = {}

export default function CompanionCardFlush({}: Props) {
  return (
    <div className="w-full max-w-[72rem] pt-32 pb-10">
      <div className="flex items-center justify-start gap-4">
        <div className="flex flex-col items-start justify-center gap-2 max-w-[30%]">
        <h1 className="text-4xl font-bold text-foreground">Companion Modes</h1>
        <h2 className="text-foreground">Choose from any of the three companion modes to interact and learn more about the Pokémon universe in a unique and engaging way. Your smart companion is tailored to answer your questions with Pokémon contextualization, providing the most accurate and helpful responses possible.</h2>
      </div></div>
    </div>
  )
}