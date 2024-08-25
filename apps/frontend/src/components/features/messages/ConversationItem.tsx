import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ConversationItem({
  name,
  message,
  time,
  avatar,
  onClick,
}: {
  name: string;
  message: string;
  time: string;
  avatar: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 rounded-md p-2 hover:bg-muted">
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={avatar} alt="Avatar" />
        <AvatarFallback>{name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{name}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </button>
  );
}
