import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      toast.show('Email is required.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.show('Please enter a valid email address.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
      return;
    }

    if (!password.trim()) {
      toast.show('Password is required.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
      return;
    }

    if (password.length < 6) {
      toast.show('Password must be at least 6 characters.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
      return;
    }

    try {
      setLoading(true);
      // TODO: Connect to authentication backend (email/password sign-in)
      navigation.navigate('home');
    } catch (error: unknown) {
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
      <Text style={styles.subtitle}>Your Local Deals Companion</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.loginButton, loading && styles.disabledButton]}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>LOGIN</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#4C6EF5',
    borderRadius: 60,
    marginBottom: 20,
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4C6EF5',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
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
    backgroundColor: '#F8F9FA',
    color: '#333',
  },
  loginButton: {
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
  loginButtonText: {
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

export default SignInScreen;
