import MessageBox from '@/components/MessageBox';
import { getMessages } from '@/pages/api/chat';
import { signIn, useSession } from 'next-auth/react';
import { QueryClient, dehydrate } from 'react-query';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  withCredentials: true,
});

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
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <p>Access Denied</p>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  }
  return (
    <>
      <MessageBox socket={socket} />
    </>
  );
}
