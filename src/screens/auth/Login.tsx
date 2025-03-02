import React, { useState } from 'react';
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
  Dimensions,
  ScrollView,
} from 'react-native';
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import COLORS from '@/constant/color';
import commonStyles from '@/styles/GlobalStyles';
import { RFValue } from "react-native-responsive-fontsize"

const { width } = Dimensions.get('window');

const Login: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  return (
    <CustomSafeAreaView>
      <ScrollView
      contentContainerStyle = {{
        paddingVertical:10,
        flexGrow:1
      }}
      showsVerticalScrollIndicator = {false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.inner}>
              {/* Top gradient background */}
              <View style={styles.topBackground} />

              {/* Logo and app name */}
              <View style={commonStyles.logoContainer}>
                <Image
                  source={require('../../../assets/images/logo.png')}
                  style={commonStyles.logo}
                />
                <Text style={styles.appName}>ReactChat</Text>
                <Text style={styles.tagline}>
                  Connect and chat with friends
                </Text>
              </View>

              {/* Form container */}
              <View style={commonStyles.formContainer}>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.instructionText}>
                  Sign in to continue to your account
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

                {/* Password input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Your password"
                      placeholderTextColor={COLORS.gray}
                      secureTextEntry={secureTextEntry}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    >
                      <Text style={{ color: COLORS.darkGray }}>
                        {secureTextEntry ? 'Show' : 'Hide'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Forgot password link */}
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                {/* Login button */}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => {}}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color="red" />
                  ) : (
                    <Text style={styles.loginButtonText}>Sign In</Text>
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
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      { backgroundColor: COLORS.navy },
                    ]}
                  >
                    <Text
                      style={[styles.socialButtonText, { color: COLORS.white }]}
                    >
                      Facebook
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Register link */}
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>
                    Don't have an account?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                  >
                    <Text style={styles.registerLink}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  topBackground: {
    position: 'absolute',
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
    fontWeight: '900',
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
    fontWeight: '700',
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
    fontWeight: '600',
    color: COLORS.navy,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: COLORS.black,
    fontSize: RFValue(14),
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: RFValue(17),
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  socialButton: {
    width: '48%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  socialButtonText: {
    fontWeight: '600',
    fontSize: RFValue(15),
    color: COLORS.navy,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: COLORS.darkGray,
    fontSize: RFValue(14),
  },
  registerLink: {
    color: COLORS.black,
    fontSize: RFValue(14),
    fontWeight: '900',
  },
});

export default Login;
