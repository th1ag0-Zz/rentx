import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { Load } from '../../components/Load';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';

export const Home: React.FC = () => {
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
    </Container>
  );
};
