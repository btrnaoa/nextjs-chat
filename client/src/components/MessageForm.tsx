import { useState } from 'react';
import { Socket } from 'socket.io-client';

interface MessageFormProps {
  socket: Socket;
}

export default function MessageForm({ socket }: MessageFormProps) {
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        className="flex-grow px-2 py-1 mr-4 text-gray-200 bg-transparent border border-gray-600"
        type="text"
        value={message}
        onChange={handleChange}
      />
      <button className="px-2 py-1 text-gray-400">Send</button>
    </form>
  );
}
