import React from 'react';
import { StatusBar } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import {
  Container,
  Header,
  SliderContent,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessorys,
  Footer,
} from './styles';
import { Button } from '../../components/Button';

export const CarDetails: React.FC = () => {
  const imageUrl =
    'https://www.freeiconspng.com/uploads/audi-png-transparent-png-12.png';
  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <SliderContent>
        <ImageSlider imagesUrl={[imageUrl]} />
      </SliderContent>

      <Content>
        <Details>
          <Description>
            <Brand>{'Lamborguini'}</Brand>
            <Name>{'Huracan'}</Name>
          </Description>

          <Rent>
            <Period>{'Ao dia'}</Period>
            <Price>{'R$ 580'}</Price>
          </Rent>
        </Details>

        <Accessorys>
          <Accessory icon={SpeedSvg} name="380 km/h" />
          <Accessory icon={AccelerationSvg} name="3.2s" />
          <Accessory icon={ForceSvg} name="800 HP" />
          <Accessory icon={GasolineSvg} name="Gasolina" />
          <Accessory icon={ExchangeSvg} name="Auto" />
          <Accessory icon={PeopleSvg} name="2 pessoas" />
        </Accessorys>

        <About>
          {
            'Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.'
          }
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={() => {}} />
      </Footer>
    </Container>
  );
};
