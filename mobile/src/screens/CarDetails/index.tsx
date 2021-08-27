import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

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
import { Button } from '../../components/Button';

interface Params {
  car: CarDTO;
}

export const CarDetails: React.FC = () => {
  const { navigate, goBack } = useNavigation<any>();
  const { params } = useRoute();
  const { car } = params as Params;

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
            <ImageSlider imagesUrl={car.photos} />
          </SliderContent>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
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
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};
