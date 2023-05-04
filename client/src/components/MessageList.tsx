import { Message } from '@/types/chat';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import MessageItem from './MessageItem';

interface MessageListProps {
  socket: Socket;
}

export default function MessageList({ socket }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const onMessage = (message: Message) =>
      setMessages((prev) => [...prev, message]);

    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    };
  }, [messages, socket]);

  return (
    <ul>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
}
