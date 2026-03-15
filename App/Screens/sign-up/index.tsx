import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { saveUserData } from '../../../lib/storageUtils'; // Import the utility function
import { AuthContext } from '../../../lib/AuthContext';
import { createPostalCodeUser } from '../../../actions/postal-code/create-code';

const SignupScreen = ({ navigation }: any) => {
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { setIsLoggedIn, updateUserData } = useContext(AuthContext); // Access the setIsLoggedIn function

  const validatePostalCode = (code: string): boolean => {
    const postalCodeRegex = /^[A-Za-z0-9]{6}$/;
    return postalCodeRegex.test(code);
  };

  const handleSignup = async () => {
    if (!postalCode.trim()) {
      toast.show('Postal Code is required!', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
      return;
    }

    if (!validatePostalCode(postalCode.trim())) {
      toast.show('Postal Code must be exactly 6 alphanumeric characters!', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
      return;
    }

    try {
      setLoading(true);

      // Call createPostalCodeUser server action
      const result = await createPostalCodeUser(postalCode);

      if (result.success && result.userId) {
        const { userId, postalCode: userPostalCode, fcmToken } = result;
        const userData = { userId, postalCode: userPostalCode, fcmToken }; // Save postalCode, userId, and FCM token

        // Save user data locally
        await saveUserData('userData', userData);

        // Update AuthContext with the new user data
        updateUserData(userData);

        // Show success message
        toast.show('User registered successfully!', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        });

        // Update global login state
        setIsLoggedIn(true);
      } else {
        throw new Error(
          result.message || 'Registration failed. Please try again.',
        );
      }
    } catch (error) {
      console.error('Error during registration:', error);
      const message =
        error instanceof Error ? error.message : 'An error occurred. Please try again.';
      toast.show(message, {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Logo Icon */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/appstore.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>EasyFlyer</Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your Postal Code (6 alphanumeric characters)"
        placeholderTextColor="#999"
        value={postalCode}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^A-Za-z0-9]/g, '').slice(0, 6);
          setPostalCode(filteredText.toUpperCase());
        }}
        keyboardType="default"
        keyboardAppearance="light"
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={6}
      />

      {/* Signup Button */}
      <TouchableOpacity
        onPress={handleSignup}
        style={[styles.signupButton, loading && styles.disabledButton]}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        )}
      </TouchableOpacity>

      {/* Legal Links */}
      <View style={styles.legalLinks}>
        <TouchableOpacity
          onPress={() => navigation.navigate('privacyPolicy')}
          style={styles.legalLink}>
          <Text style={styles.legalLinkText}>Privacy Policy</Text>
        </TouchableOpacity>

        <Text style={styles.separator}>•</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('termsAndConditions')}
          style={styles.legalLink}>
          <Text style={styles.legalLinkText}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#4C6EF5',
    borderRadius: 60,
    marginBottom: 30,
    shadowColor: '#4C6EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#4C6EF5',
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#333',
  },
  signupButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#4C6EF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#4C6EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  disabledButton: {
    backgroundColor: '#A0AEC0',
    shadowOpacity: 0,
    elevation: 0,
  },
  legalLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  legalLink: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  legalLinkText: {
    color: '#4C6EF5',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  separator: {
    color: '#999',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default SignupScreen;
