import React, { memo } from 'react'
import Link from 'next/link'

interface CardProps {
  id: string
  title: string
  image: string
  onClick: (id: string) => void
}

const Card: React.FC<CardProps> = memo(({ id, title, image, onClick }) => {
  return (
    <div
      className=" m-[20px] card cursor-pointer h-[200px] border rounded-lg shadow-lg overflow-hidden w-[300px] object-contain  flex  justify-between"
      onClick={() => onClick(id)}
    >
      <div className="max-w-[50%] h-full">
        <img src={image} alt={title} className=" w-auto object-cover" />
      </div>
      <div className="p-4 max-w-[40%]">
        <h2 className="text-xl text-right font-bold">{title}</h2>
      </div>
    </div>
  )
})

export default Card
