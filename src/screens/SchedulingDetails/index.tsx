import React from 'react';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

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
  Accessorys,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';

import { Button } from '../../components/Button';

export const SchedulingDetails: React.FC = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const imageUrl =
    'https://www.freeiconspng.com/uploads/audi-png-transparent-png-12.png';

  function handleConfirmRental() {
    navigate('SchedulingComplete');
  }

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

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>{'DE'}</DateTitle>
            <DateValue>{'18/06/2021'}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />

          <DateInfo>
            <DateTitle>{'ATÉ'}</DateTitle>
            <DateValue>{'18/06/2021'}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>{'TOTAL'}</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>{'R$ 580 x3 diárias'}</RentalPriceQuota>
            <RentalPriceTotal>{'R$ 2700'}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={colors.success}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};
