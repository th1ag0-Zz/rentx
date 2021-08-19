import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/loadingCar.json';

import { Container } from './styles';

export const LoadAnimation: React.FC = () => {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        autoPlay
        style={{ height: 180 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
};
