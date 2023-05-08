import MessageBox from '@/components/MessageBox';
import { getMessages } from '@/pages/api/chat';
import { QueryClient, dehydrate } from 'react-query';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['messages'], getMessages);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Chat() {
  return (
    <>
      <MessageBox socket={socket} />
    </>
  );
}
