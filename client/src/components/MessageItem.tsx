import { Message } from '@/types/chat';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const time = new Date(message.createdAt).toLocaleString([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <li>
      {message.content} {time.toUpperCase()}
    </li>
  );
}
