"use client";

import { IProfile } from "@/types";
import Image from "next/image";

interface TinderCardProps {
  card: IProfile;
}

export default function TinderCard({ card }: TinderCardProps) {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full">
      <div className="relative h-80 w-full">
        {card.image && <Image src={card.image} alt={card.name} fill style={{ objectFit: "cover" }} />}
        {!card.image && <div className="w-full h-full bg-gray-300" />}
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">
          {card.name}, {card.age}
        </h2>
        <p className="text-gray-600 mt-2">{card.bio}</p>
      </div>
    </div>
  );
}
