import React, { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from 'react-native-toast-notifications';
import { AuthContext } from '../../../lib/AuthContext';
import { editPostalCode } from '../../../actions/postal-code/edit-code';
import { postalCodeSchema, PostalCodeFormData } from '../../../utils/validationSchemas';

const UpdatePostalCodeScreen = ({ navigation }: any) => {
  const toast = useToast();

  const {
    updateUserData,
    postalCode: globalPostalCode,
    userData,
  } = useContext(AuthContext);

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
      const result = await editPostalCode(
        globalPostalCode,
        data.postalCode,
        userData.userId,
      );

      if (result.success) {
        const { oldPostalCode, newPostalCode, userId, fcmToken } = result;

        updateUserData({ postalCode: newPostalCode, userId, fcmToken });

        toast.show(
          `Postal Code updated successfully from '${oldPostalCode}' to '${newPostalCode}'!`,
          {
            type: 'success',
            placement: 'top',
            duration: 3000,
            animationType: 'slide-in',
          },
        );

        navigation.goBack();
      } else {
        toast.show(result.message || 'Failed to update postal code.', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        });
      }
    } catch (error) {
      console.error('Error updating postal code:', error);
      toast.show('An error occurred. Please try again later.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#000000" />
        </TouchableOpacity>

        {/* Profile Icon */}
        <View style={styles.profileIconContainer}>
          <Text style={styles.profileIconText}>📮</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Update Postal Code</Text>

        {/* Input Field */}
        <Controller
          control={control}
          name="postalCode"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.postalCode && styles.inputError]}
              placeholder="Enter your New Postal Code (6 alphanumeric characters)"
              placeholderTextColor="#888"
              value={value}
              onChangeText={(text) => {
                onChange(text.replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase());
              }}
              onBlur={onBlur}
              keyboardType="default"
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={6}
              accessibilityLabel="Postal Code Input"
              editable={!isSubmitting}
            />
          )}
        />
        {errors.postalCode && (
          <Text style={styles.errorText}>{errors.postalCode.message}</Text>
        )}

        {/* Current Postal Code Display */}
        <Text style={styles.currentPostalCode}>
          Current Postal Code: {globalPostalCode || 'Not Set'}
        </Text>

        {/* Update Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[styles.updateButton, isSubmitting && styles.disabledButton]}
          disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.updateButtonText}>Update</Text>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  keyboardContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  profileIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4C6EF5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#4C6EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileIconText: {
    fontSize: 50,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#4C6EF5',
    textAlign: 'center',
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
    backgroundColor: '#FFFFFF',
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
  currentPostalCode: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 20,
    textAlign: 'center',
  },
  updateButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#4C6EF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#4C6EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  updateButtonText: {
    color: '#FFFFFF',
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

export default UpdatePostalCodeScreen;
