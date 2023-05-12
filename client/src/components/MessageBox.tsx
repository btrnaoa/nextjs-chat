import { Socket } from 'socket.io-client';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

interface MessageBoxProps {
  socket: Socket;
}

export default function MessageBox({ socket }: MessageBoxProps) {
  return (
    <div className="container flex flex-col max-h-screen px-12 py-8 mx-auto">
      <div className="flex flex-col-reverse flex-grow overflow-hidden hover:overflow-y-auto">
        <MessageList socket={socket} />
      </div>
      <div className="mt-4">
        <MessageForm socket={socket} />
      </div>
    </div>
  );
}
