import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { LoadAnimation } from '../../components/LoadAnimation';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';

export const Home: React.FC = () => {
  const { navigate } = useNavigation<any>();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDatails(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMonted = true;

    async function loadData() {
      try {
        const response = await api.get('/cars');
        const data = response.data as CarDTO[];

        if (isMonted) {
          setCars(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMonted) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMonted = false;
    };
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
          {!loading && <TotalCars>{`Total: ${cars.length} carros`}</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
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
