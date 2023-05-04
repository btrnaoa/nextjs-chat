import { Socket } from 'socket.io-client';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

interface MessageBoxProps {
  socket: Socket;
}

export default function MessageBox({ socket }: MessageBoxProps) {
  return (
    <div>
      <MessageList socket={socket} />
      <MessageForm socket={socket} />
    </div>
  );
}
