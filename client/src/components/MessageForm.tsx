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
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={handleChange} />
      <button>Send</button>
    </form>
  );
}
