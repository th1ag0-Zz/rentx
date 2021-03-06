import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useNetInfo } from '@react-native-community/netinfo';

import { api } from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/models/Car';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessorysIcon } from '../../utils/getAccessorysIcon';

import {
  Container,
  Header,
  SliderContent,
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

interface Params {
  car: ModelCar;
}

export const CarDetails: React.FC = () => {
  const { navigate, goBack } = useNavigation<any>();
  const { params } = useRoute();
  const { car } = params as Params;

  const netInfo = useNetInfo();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    const formatValue = Number(event.contentOffset.y.toFixed(0));
    scrollY.value = formatValue < 0 ? 0 : formatValue;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [295, 120],
        Extrapolate.CLAMP,
      ),
    };
  });

  const sliderStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleConfirmRental() {
    navigate('Scheduling', { car });
  }

  function handleBack() {
    goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Animated.View style={[headerStyleAnimation]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View style={sliderStyleAnimation}>
          <SliderContent>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </SliderContent>
        </Animated.View>
      </Animated.View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
        // onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${
              netInfo.isConnected === true ? car.price : '...'
            }`}</Price>
          </Rent>
        </Details>

        {!!carUpdated.accessories && (
          <Accessorys>
            {carUpdated.accessories.map(item => (
              <Accessory
                key={item.type}
                icon={getAccessorysIcon(item.type)}
                name={item.name}
              />
            ))}
          </Accessorys>
        )}

        <About>{car.about}</About>
      </ScrollView>

      <Footer>
        <Button
          title="Escolher per??odo do aluguel"
          onPress={handleConfirmRental}
          enabled={!!netInfo.isConnected}
        />
      </Footer>
    </Container>
  );
};
