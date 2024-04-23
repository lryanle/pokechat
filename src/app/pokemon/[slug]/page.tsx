import React from 'react'

type Props = {
  params: { slug: string }
}

export default function page({ params }: Props) {
  return (
    <div className="py-32">post: {params.slug}</div>
  )
}