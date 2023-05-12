import { getMessages } from '@/pages/api/chat';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Socket } from 'socket.io-client';
import MessageItem from './MessageItem';

interface MessageListProps {
  socket: Socket;
}

export default function MessageList({ socket }: MessageListProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOnMessage = () => {
      queryClient.invalidateQueries('messages');
    };

    socket.on('message', handleOnMessage);

    return () => {
      socket.off('message', handleOnMessage);
    };
  }, [queryClient, socket]);

  const { data: messages } = useQuery({
    queryKey: 'messages',
    queryFn: getMessages,
  });

  return (
    <ul className='space-y-4'>
      {messages &&
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
    </ul>
  );
}
