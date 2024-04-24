"use client"

import { useEffect } from 'react';
import { useTts } from 'tts-react'
import type { TTSHookProps } from 'tts-react'

interface CustomProps extends TTSHookProps {
  highlight?: boolean
}

export const TextToVoice = ({ children, highlight = false }: CustomProps) => {
  const { ttsChildren, state, play, stop, pause } = useTts({
    children,
    markTextAsSpoken: highlight,
    autoPlay: true,
  })

  return (
    <div>
      {ttsChildren}
    </div>
  )
}