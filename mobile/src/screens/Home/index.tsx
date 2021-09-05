import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { synchronize } from '@nozbe/watermelondb/sync';
import { useNetInfo } from '@react-native-community/netinfo';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { LoadAnimation } from '../../components/LoadAnimation';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/models/Car';
import { database } from '../../database';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  ErrorText,
  CarList,
} from './styles';

export const Home: React.FC = () => {
  const netInfo = useNetInfo();
  const { navigate } = useNavigation<any>();

  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  function handleCarDatails(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
        );

        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user).catch(console.log);
      },
    });
  }

  useEffect(() => {
    let isMonted = true;

    async function loadData() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if (isMonted) {
          setCars(cars);
        }
      } catch (error) {
        if (isMonted) {
          console.log(error);
          setErrorMessage('Ocorreu um erro.\nTente novamente mais tarde!');
        }
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

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
      console.log('função de sync ativada');
    }
  }, [netInfo.isConnected]);

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
      ) : errorMessage ? (
        <ErrorText>{errorMessage}</ErrorText>
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
