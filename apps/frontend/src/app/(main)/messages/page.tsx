"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import ConversationItem from "@/components/features/messages/ConversationItem";
import ConversationMessage from "@/components/features/messages/ConversationMessage";
import { useState } from "react";

const CONVERSATIONS = [
  {
    name: "John Doe",
    message: "Hey, did you get my last message?",
    time: "2:34 PM",
    avatar: "/placeholder-user.jpg",
    id: "1",
  },
  {
    name: "Jane Smith",
    message: "Sure, I'll take a look at it later.",
    time: "12:45 PM",
    avatar: "/placeholder-user.jpg",
    id: "2",
  },
  {
    name: "Michael Johnson",
    message: "Great, I'll get started on that right away.",
    time: "9:22 AM",
    avatar: "/placeholder-user.jpg",
    id: "3",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
  {
    name: "Emily Saunders",
    message: "No problem, I'll send you the file later today.",
    time: "Yesterday",
    avatar: "/placeholder-user.jpg",
    id: "4",
  },
];

const MESSAGES = {
  "1": [
    {
      message: "Hey, did you get my last message?",
      time: "2:34 PM",
      isMe: false,
      avatar: "/placeholder-user.jpg",
      name: "John Doe",
    },
    {
      message: "Yes, I got it. I'll take a look at it later.",
      time: "2:35 PM",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Jane Smith",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "2:36 PM",
      isMe: false,
      avatar: "/placeholder-user.jpg",
      name: "John Doe",
    },
  ],
  "2": [
    {
      message: "Sure, I'll take a look at it later.",
      time: "12:45 PM",
      isMe: false,
      avatar: "/placeholder-user.jpg",
      name: "Jane Smith",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "12:46 PM",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Jane Smith",
    },
  ],

  "3": [
    {
      message: "Great, I'll get started on that right away.",
      time: "9:22 AM",
      isMe: false,
      avatar: "/placeholder-user.jpg",
      name: "Michael Johnson",
    },
    {
      message: "Sure, I'll take a look at it later.",
      time: "9:23 AM",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Michael Johnson",
    },
  ],

  "4": [
    {
      message: "No problem, I'll send you the file later today.",
      time: "Yesterday",
      isMe: false,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
    {
      message: "Great, I'll get started on that right away.",
      time: "Yesterday",
      isMe: true,
      avatar: "/placeholder-user.jpg",
      name: "Emily Saunders",
    },
  ],
};

export default function Page() {
  const [selectedConversation, setSelectedConversation] = useState(CONVERSATIONS[0]);
  return (
    <div className="grid h-full w-full bg-background md:grid-cols-[300px_1fr]">
      <div className="border-b bg-muted/40 p-4 md:border-r md:p-4 max-h-full overflow-scroll">
        <div className="mb-4 flex items-center justify-between ">
          <h2 className="text-lg font-semibold">Conversations</h2>
        </div>
        <div className="space-y-2 overflow-auto">
          {CONVERSATIONS.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              name={conversation.name}
              message={conversation.message}
              time={conversation.time}
              avatar={conversation.avatar}
              onClick={() => setSelectedConversation(conversation)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col h-[calc(100vh-77px)] relative">
        <div className="border-b p-4 sticky top-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={selectedConversation.avatar} alt="Avatar" />
              <AvatarFallback>{selectedConversation.name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{selectedConversation.name}</h3>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
        </div>
        <div className="overflow-scroll p-4 ">
          <div className="grid gap-4">
            {MESSAGES[selectedConversation.id as keyof typeof MESSAGES].map((message, index) => (
              <ConversationMessage
                key={index}
                message={message.message}
                time={message.time}
                isMe={message.isMe}
                avatar={message.avatar}
                name={message.name}
              />
            ))}
          </div>
        </div>
        <div className="border-t p-4 sticky bottom-0">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              className="pr-16 min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm"
            />
            <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
              <ArrowUpIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
