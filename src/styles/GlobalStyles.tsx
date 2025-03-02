// constants/styles.js

import COLORS from '@/constant/color';
import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    marginTop: 20,
    padding: 25,
    paddingBottom: 30,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default commonStyles;
