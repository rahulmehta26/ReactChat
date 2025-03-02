import CustomSafeAreaView from "@/components/CustomSafeAreaView"
import COLORS from "@/constant/color"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
// import { useAuth } from "../contexts/AuthContext"

interface SettingProps {
  navigation: any
}

const Setting : React.FC<SettingProps> = ({ navigation }) => {
  // const { signOut } = useAuth()

  // const handleLogout = async () => {
  //   try {
  //     await signOut()
  //     navigation.replace("Login")
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to log out. Please try again.")
  //     console.error(error)
  //   }
  // }

  return (
    <CustomSafeAreaView>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: RFValue(16),
    fontWeight: "900",
  },
})

export default Setting