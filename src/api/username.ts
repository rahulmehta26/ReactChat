const API_URL = process.env.EXPO_API_URL;

export const setUsername = async (username: string, userId: string) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, userId }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to set username")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error setting username:", error)
      throw error
    }
  }