import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

export const Splash: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation<any>();
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -60],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-60, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  function startApp() {
    //const screenName = user.id ? 'Home' : 'SignIn';
    navigate('SignIn');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      'worklet';
      runOnJS(startApp)();
    });
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
};
