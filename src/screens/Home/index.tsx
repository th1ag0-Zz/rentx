import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';

import { Container, Header, TotalCars, HeaderContent } from './styles';

export const Home: React.FC = () => {
  const data = {
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: '120',
    },
    thumbnail: 'https://cdn.picpng.com/audi/audi-red-a5-28597.png',
  };

  const data2 = {
    brand: 'PORSCHE',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: '120',
    },
    thumbnail:
      'https://www.freeiconspng.com/uploads/audi-png-transparent-png-12.png',
  };

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

      <CarCard data={data} />
      <CarCard data={data2} />
    </Container>
  );
};
