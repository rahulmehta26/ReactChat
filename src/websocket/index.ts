export const createWebSocketConnection = (roomId: string, username: string) => {
    return new WebSocket(`${process.env.EXPO_WEBSCOKET_URL}/ws/${roomId}/${username}`);
  };
  