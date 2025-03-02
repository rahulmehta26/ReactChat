export interface Room {
  id: string;
  name: string;
  createdAt: string;
}

const API_URL = process.env.EXPO_API_URL;

export const getRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch(`${API_URL}/rooms`);

    if (!response.ok) {
      throw new Error('Failed to fetch rooms');
    }

    return (await response.json()) as Room[];
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const createRoom = async (name: string): Promise<Room> => {
  try {
    const response = await fetch(`${API_URL}/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('Failed to create room');
    }

    return (await response.json()) as Room;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};
