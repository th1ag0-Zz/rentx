import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export const Confirmation: React.FC = () => {
  const { params } = useRoute();
  const { title, message, nextScreenRoute } = params as Params;

  const { navigate } = useNavigation<any>();
  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigate(nextScreenRoute);
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
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton onPress={handleConfirm} title="OK" />
      </Footer>
    </Container>
  );
};
