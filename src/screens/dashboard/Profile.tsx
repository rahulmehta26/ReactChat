import { View, Text, StyleSheet } from "react-native"
import CustomSafeAreaView from "@/components/CustomSafeAreaView"
import { RFValue } from "react-native-responsive-fontsize"
// import { useAuth } from "../contexts/AuthContext"

const Profile = () => {
  // const { user } = useAuth()

  return (
    <CustomSafeAreaView>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        {/* <Text style={styles.info}>Username: {user?.username}</Text>
        <Text style={styles.info}>Email: {user?.email}</Text> */}
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
  info: {
    fontSize: RFValue(16),
    marginBottom: 10,
  },
})

export default Profile