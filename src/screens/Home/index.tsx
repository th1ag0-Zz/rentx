import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Container, Header, TotalCars, HeaderContent } from './styles';

export const Home: React.FC = () => {
  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>{'Total: 12 carros'}</TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  );
};
