"use client";

import Image from 'next/image';

interface Card {
  name: string;
  age: string;
  bio: string;
  image: string;
}

interface TinderCardProps {
  card: Card;
}

export default function TinderCard({ card }: TinderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-80 w-full">
        <Image src={card.image} alt={card.name} fill style={{objectFit: "cover"}} />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">{card.name}, {card.age}</h2>
        <p className="text-gray-600 mt-2">{card.bio}</p>
      </div>
    </div>
  );
}