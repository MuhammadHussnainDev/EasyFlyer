import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SignupScreen from '../Screens/sign-up';
import PrivacyPolicyScreen from '../Screens/PrivacyPolicy';
import TermsAndConditionsScreen from '../Screens/TermsAndConditions';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="signUp"
      screenOptions={{ headerShown: false, gestureEnabled: true }}>
      {/* Signup Screen: Fade Animation */}
      <Stack.Screen
        name="signUp"
        component={SignupScreen}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      {/* Privacy Policy Screen */}
      <Stack.Screen
        name="privacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      {/* Terms and Conditions Screen */}
      <Stack.Screen
        name="termsAndConditions"
        component={TermsAndConditionsScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
