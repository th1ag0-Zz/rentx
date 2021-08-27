import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { StepOne, StepTwo } from '../screens/SignUp';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="StepOne" component={StepOne} />
      <Screen name="StepTwo" component={StepTwo} />
    </Navigator>
  );
}
