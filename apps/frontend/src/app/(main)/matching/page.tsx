"use client";

import Card, { CardType, SwipeType } from "@/components/features/matching/Card";
import { AnimatePresence, PanInfo } from "framer-motion";
import { RotateCwIcon } from "lucide-react";
import { useState } from "react";

export const CARDS = [
  { id: 0, emoji: "🍅", name: "Tomato", color: "#E42100" },
  { id: 1, emoji: "🍊", name: "Tangerine", color: "#F36000" },
  { id: 2, emoji: "🍋", name: "Lemon", color: "#F3BC00" },
  { id: 3, emoji: "🍐", name: "Pear", color: "#A0A226" },
  { id: 4, emoji: "🥬", name: "Lettuce", color: "#349B19" },
  { id: 5, emoji: "🫐", name: "Blueberries", color: "#70BBFF" },
  { id: 6, emoji: "🍆", name: "Eggplant", color: "#7F4877" },
  { id: 7, emoji: "🍇", name: "Grapes", color: "#BC2A6E" },
];

export type ResultType = { [k in SwipeType]: number };

export type HistoryType = CardType & { swipe: SwipeType };

interface CounterProps {
  testid: string;
  label: string;
  count: number;
}

const Counter: React.FC<CounterProps> = ({ count, label, testid }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className="w-14 h-8 text-xl font-medium rounded-full bg-white inline-flex justify-center items-center"
        data-testid={testid}
      >
        {count}
      </div>
      <span className="text-xs">{label}</span>
    </div>
  );
};

export default function Page() {
  const [cards, setCards] = useState(CARDS);

  const [result, setResult] = useState<ResultType>({
    like: 0,
    nope: 0,
    superlike: 0,
  });
  // index of last card
  const activeIndex = cards.length - 1;
  const removeCard = (oldCard: CardType, swipe: SwipeType) => {
    setCards((current) =>
      current.filter((card) => {
        return card.id !== oldCard.id;
      })
    );
    setResult((current) => ({ ...current, [swipe]: current[swipe] + 1 }));
  };

  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);

  const onSuperlike = () => {
    setLeaveY(-2000);
    removeCard(cards[activeIndex], "superlike");
  };

  const onLike = () => {
    setLeaveX(1000);
    removeCard(cards[activeIndex], "like");
  };

  const onNope = () => {
    setLeaveX(-1000);
    removeCard(cards[activeIndex], "nope");
  };

  const cardClassNames = `absolute h-[430px] w-[300px] bg-white shadow-xl rounded-2xl flex flex-col justify-center items-center cursor-grab`;

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div>
          <div className="relative h-[582px] w-[300px]">
            <AnimatePresence>
              {cards.map((card, index) => (
                <Card key={card.name} active={index === activeIndex} removeCard={removeCard} card={card} />
              ))}
            </AnimatePresence>
            {cards.length === 0 ? <span className=" text-xl">End of Stack</span> : null}
          </div>
          <footer className="grid grid-cols-3 mt-6">
            <Counter label="Likes" count={result.like} testid="like-count" />
            <Counter label="Nopes" count={result.nope} testid="nope-count" />
            <Counter label="Superlike" count={result.superlike} testid="superlike-count" />
          </footer>
        </div>
      </div>
    </>
  );
}
