import React, { useContext } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from 'react-native-toast-notifications';
import { saveUserData } from '../../../lib/storageUtils';
import { AuthContext } from '../../../lib/AuthContext';
import { createPostalCodeUser } from '../../../actions/postal-code/create-code';
import { postalCodeSchema, PostalCodeFormData } from '../../../utils/validationSchemas';

const SignupScreen = ({ navigation }: any) => {
  const toast = useToast();
  const { setIsLoggedIn, updateUserData } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostalCodeFormData>({
    resolver: zodResolver(postalCodeSchema),
    defaultValues: { postalCode: '' },
  });

  const onSubmit = async (data: PostalCodeFormData) => {
    try {
      const result = await createPostalCodeUser(data.postalCode);

      if (result.success && result.userId) {
        const { userId, postalCode: userPostalCode, fcmToken } = result;
        const userData = { userId, postalCode: userPostalCode, fcmToken };

        await saveUserData('userData', userData);
        updateUserData(userData);

        toast.show('User registered successfully!', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        });

        setIsLoggedIn(true);
      } else {
        throw new Error(result.message || 'Registration failed. Please try again.');
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

      {/* Postal Code Field */}
      <Controller
        control={control}
        name="postalCode"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.postalCode && styles.inputError]}
            placeholder="Enter your Postal Code (6 alphanumeric characters)"
            placeholderTextColor="#999"
            value={value}
            onChangeText={(text) => {
              onChange(text.replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase());
            }}
            onBlur={onBlur}
            keyboardType="default"
            keyboardAppearance="light"
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={6}
            editable={!isSubmitting}
          />
        )}
      />
      {errors.postalCode && (
        <Text style={styles.errorText}>{errors.postalCode.message}</Text>
      )}

      {/* Signup Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.signupButton, isSubmitting && styles.disabledButton]}
        disabled={isSubmitting}>
        {isSubmitting ? (
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
    marginBottom: 4,
    backgroundColor: '#fff',
    color: '#333',
  },
  inputError: {
    borderColor: '#e53e3e',
  },
  errorText: {
    width: '100%',
    fontSize: 13,
    color: '#e53e3e',
    marginBottom: 12,
    paddingLeft: 4,
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
