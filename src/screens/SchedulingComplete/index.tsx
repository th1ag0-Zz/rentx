import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

export const SchedulingComplete: React.FC = () => {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigate('Home');
  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} heigth={80} />
        <Title>{'Carro alugado'}</Title>

        <Message>
          {
            'Agora você só precisa ir\naté a concessionária da RENTX\ne pegar seu automóvel.'
          }
        </Message>
      </Content>

      <Footer>
        <ConfirmButton onPress={handleConfirm} title="OK" />
      </Footer>
    </Container>
  );
};
