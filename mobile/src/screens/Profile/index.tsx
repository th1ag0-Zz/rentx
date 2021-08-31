import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogOutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
} from './styles';

export const Profile: React.FC = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  function handleSignOut() {}

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={colors.shape} onPress={handleBack} />
          <HeaderTitle>{'Editar Perfil'}</HeaderTitle>
          <LogOutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={colors.shape} />
          </LogOutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo
            source={{
              uri: 'https://avatars.githubusercontent.com/u/61771003?v=4',
            }}
          />
          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
};
