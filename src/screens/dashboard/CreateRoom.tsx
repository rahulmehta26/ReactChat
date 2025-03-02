import { createRoom } from "@/api/room"
import CustomSafeAreaView from "@/components/CustomSafeAreaView"
import COLORS from "@/constant/color"
import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const CreateRoom: React.FC = ({navigation}: any) => {

  const [roomName, setRoomName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert("Error", "Please enter a room name")
      return
    }

    try {
      setLoading(true)
      const newRoom = await createRoom(roomName)
      navigation.navigate("Chat", { roomId: newRoom.id, roomName: newRoom.name })
    } catch (error) {
      Alert.alert("Error", "Failed to create room. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomSafeAreaView>
      <View style={styles.content}>
        <Text style={styles.title}>Create a New Room</Text>
        <Text style={styles.subtitle}>Enter a name for your chat room</Text>

        <TextInput style={styles.input} placeholder="Room Name" value={roomName} onChangeText={setRoomName} />

        <TouchableOpacity style={styles.button} onPress={handleCreateRoom} disabled={loading}>
          {loading ? <ActivityIndicator color="red" /> : <Text style={styles.buttonText}>Create Room</Text>}
        </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: "900",
    marginBottom: 10,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: RFValue(16),
    color: COLORS.darkGray,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: RFValue(16),
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: RFValue(16),
    fontWeight: "900",
  },
})

export default CreateRoom