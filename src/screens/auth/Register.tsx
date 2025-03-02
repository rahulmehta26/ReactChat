import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView
} from "react-native";
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import commonStyles from "@/styles/GlobalStyles";
import COLORS from "@/constant/color";
import { RFValue } from "react-native-responsive-fontsize";

const Register: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState<boolean>(true);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !username) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      // Registration logic would go here
      // await register(email, password, username);
      // navigation.replace("MainTabs");
      
      // Simulate loading for demo purposes
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error: any) {
      Alert.alert(
        "Registration Failed", 
        error.message || "An error occurred during registration"
      );
      console.error(error);
    } finally {
      // setLoading(false); // Uncomment this when implementing real registration
    }
  };

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle = {{
        paddingVertical:10,
        flexGrow:1
      }} showsVerticalScrollIndicator = {false} >
            {/* Top gradient background */}
            <View style={styles.topBackground} />

            {/* Logo and app name */}
            <View style={ commonStyles.logoContainer}>
              <Image
                source={require("../../../assets/images/logo.png")}
                style={commonStyles.logo}
              />
              <Text style={styles.appName}>ReactChat</Text>
              <Text style={styles.tagline}>Join our community today</Text>
            </View>

            {/* Form container */}
            <View style={commonStyles.formContainer}>
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.instructionText}>
                Fill in the details to get started
              </Text>

              {/* Email input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="youremail@example.com"
                    placeholderTextColor={COLORS.gray}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Username input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Username</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Choose a username"
                    placeholderTextColor={COLORS.gray}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Create a password"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  >
                    <Text style={{ color: COLORS.darkGray }}>
                      {secureTextEntry ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm your password"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureConfirmTextEntry}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setSecureConfirmTextEntry(!secureConfirmTextEntry)}
                  >
                    <Text style={{ color: COLORS.darkGray }}>
                      {secureConfirmTextEntry ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Register button */}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="red" />
                ) : (
                  <Text style={styles.registerButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              {/* Social login options */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, {backgroundColor: COLORS.navy}]}>
                  <Text style={[styles.socialButtonText, {color: COLORS.white}]}>Facebook</Text>
                </TouchableOpacity>
              </View>

              {/* Login link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  appName: {
    fontSize: RFValue(28),
    fontWeight: "900",
    color: COLORS.white,
    marginTop: 10,
  },
  tagline: {
    fontSize: RFValue(14),
    color: COLORS.white,
    marginTop: 5,
    opacity: 0.9,
    fontWeight:'700'
  },

  welcomeText: {
    fontSize: RFValue(22),
    fontWeight: "700",
    color: COLORS.navy,
    marginBottom: 5,
  },
  instructionText: {
    fontSize: RFValue(14),
    color: COLORS.darkGray,
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: COLORS.navy,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: RFValue(16),
    color: COLORS.black,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: RFValue(17),
    fontWeight: "700",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  dividerText: {
    paddingHorizontal: 15,
    fontSize: RFValue(14),
    color: COLORS.darkGray,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  socialButton: {
    width: "48%",
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
  },
  socialButtonText: {
    fontWeight: "600",
    fontSize: RFValue(15),
    color: COLORS.navy,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: COLORS.darkGray,
    fontSize: RFValue(14),
  },
  loginLink: {
    color: COLORS.black,
    fontSize: RFValue(14),
    fontWeight: "900",
  },
});

export default Register;