import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

export const Scheduling: React.FC = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  function handleConfirmRental() {
    navigate('SchedulingDetails');
  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Header>
        <BackButton color={colors.shape} onPress={() => {}} />

        <Title>{'Escolha uma\ndata de inicio e\nfim do aluguel'}</Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>{'DE'}</DateTitle>
            <DateValue selected={true}>{'18/06/2021'}</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>{'ATÉ'}</DateTitle>
            <DateValue selected={false}>{''}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
};
