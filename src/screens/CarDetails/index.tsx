import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import { getAccessorysIcon } from '../../utils/getAccessorysIcon';

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

interface Params {
  car: CarDTO;
}

export const CarDetails: React.FC = () => {
  const { navigate, goBack } = useNavigation<any>();
  const { params } = useRoute();
  const { car } = params as Params;

  function handleConfirmRental() {
    navigate('Scheduling', { car });
  }

  function handleBack() {
    goBack();
  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <SliderContent>
        <ImageSlider imagesUrl={car.photos} />
      </SliderContent>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>
        </Details>

        <Accessorys>
          {car.accessories.map(item => (
            <Accessory
              key={item.type}
              icon={getAccessorysIcon(item.type)}
              name={item.name}
            />
          ))}
        </Accessorys>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};
