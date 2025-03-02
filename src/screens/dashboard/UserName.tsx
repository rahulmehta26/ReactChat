import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native"
// import { useAuth } from "../contexts/AuthContext"
import { setUsername as apiSetUsername } from "../../api/username"
import CustomSafeAreaView from '@/components/CustomSafeAreaView'
import { RFValue } from "react-native-responsive-fontsize"
import COLORS from "@/constant/color"

const UserName : React.FC = ({navigation}:any) => {

    const [username, setUsername] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    // const { setUsername: authSetUsername } = useAuth()
  
    const handleSetUsername = async () => {
      if (!username.trim()) {
        Alert.alert("Error", "Please enter a username")
        return
      }
  
      try {
        setLoading(true)
        // Set username in the API
        await apiSetUsername(username)
        // Set username in auth context
        await authSetUsername(username)
        navigation.replace("Rooms")
      } catch (error) {
        Alert.alert("Error", "Failed to set username. Please try again.")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

  return (
    <CustomSafeAreaView >
      <View style={styles.content}>
        <Text style={styles.title}>Set Your Username</Text>
        <Text style={styles.subtitle}>Choose a username that others will see in chat rooms</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSetUsername} disabled={loading}>
          {loading ? <ActivityIndicator color="red" /> : <Text style={styles.buttonText}>Continue</Text>}
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
      fontWeight: "bold",
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
      borderColor: COLORS.lightGray,
      borderRadius: 8,
      marginBottom: 20,
      paddingHorizontal: 15,
      fontSize: RFValue(16),
      width: "100%",
    },
    button: {
      backgroundColor: "#4A90E2",
      height: 50,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    buttonText: {
      color: COLORS.white,
      fontSize: RFValue(16),
      fontWeight: "bold",
    },
  })

export default UserName