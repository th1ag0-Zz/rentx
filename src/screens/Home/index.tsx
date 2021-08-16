import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { Load } from '../../components/Load';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
} from './styles';

export const Home: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<any>();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const response = await api.get('/cars');

      const data = response.data as CarDTO[];

      setCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleCarDatails(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigate('MyCars');
  }

  useEffect(() => {
    loadData();
  }, []);

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

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={car => car.id}
          renderItem={({ item }) => (
            <CarCard onPress={() => handleCarDatails(item)} data={item} />
          )}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          size={RFValue(32)}
          name="ios-car-sport"
          color={colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
};
