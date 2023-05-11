export type Message = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
  };
};
