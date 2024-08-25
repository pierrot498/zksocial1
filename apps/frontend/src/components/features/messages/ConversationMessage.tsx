import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ConversationMessage({
  message,
  time,
  isMe,
  avatar,
  name,
}: {
  message: string;
  time: string;
  isMe: boolean;
  avatar: string;
  name: string;
}) {
  return (
    <div className={`flex items-start gap-3  ${isMe ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8 border">
        <AvatarImage src={avatar} alt="Avatar" />
        <AvatarFallback>{name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="rounded-md bg-muted p-3 text-sm">
        <p>{message.slice(0, 30)}</p>
        <div className="mt-2 text-xs text-muted-foreground">{time}</div>
      </div>
    </div>
  );
}
