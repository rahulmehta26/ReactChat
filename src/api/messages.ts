export interface Message {
  id: string;
  content: string;
  username: string;
  roomId: string;
  createdAt: string;
}

const API_URL = process.env.EXPO_API_URL;

export const getRoomMessages = async (roomId: string): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_URL}/rooms/${roomId}/messages`);

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return (await response.json()) as Message[];
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};
