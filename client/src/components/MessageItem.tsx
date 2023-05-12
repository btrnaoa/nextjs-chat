import { Message } from '@/types/chat';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const time = new Date(message.createdAt).toLocaleString([], {
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h12',
  });
  return (
    <li className="flex flex-col items-baseline">
      <div className="space-x-2">
        <span className="font-bold text-gray-500 ">{message.user.name}</span>
        <span className="text-xs text-gray-600">{time}</span>
      </div>
      <span className="max-w-full text-gray-200 break-words">
        {message.content}
      </span>
    </li>
  );
}
