import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogOutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionName,
  Section,
} from './styles';

export const Profile: React.FC = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { user, signOut } = useAuth();

  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.avatar);
  const [driverLicense, setDriverLicense] = useState(user.avatar);
  const [optionEdit, setOptionEdit] = useState<'dataEdit' | 'passwordEdit'>(
    'dataEdit',
  );

  function handleBack() {
    goBack();
  }

  function handleSignOut() {
    signOut();
  }

  function handleOptionChange(option: 'dataEdit' | 'passwordEdit') {
    setOptionEdit(option);
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={optionEdit === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionName active={optionEdit === 'dataEdit'}>
                  {'Dados'}
                </OptionName>
              </Option>
              <Option
                active={optionEdit === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionName active={optionEdit === 'passwordEdit'}>
                  {'Trocar senha'}
                </OptionName>
              </Option>
            </Options>

            {optionEdit === 'dataEdit' ? (
              <Section>
                <Input
                  defaultValue={user.name}
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  onChangeText={setName}
                />
                <Input
                  defaultValue={user.email}
                  iconName="mail"
                  editable={false}
                />
                <Input
                  defaultValue={user.driver_license}
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <InputPassword
                  iconName="lock"
                  placeholder="Senha atual"
                  autoCorrect={false}
                />
                <InputPassword
                  iconName="lock"
                  placeholder="Nova senha"
                  autoCorrect={false}
                />
                <InputPassword
                  iconName="lock"
                  placeholder="Repetir senha"
                  autoCorrect={false}
                />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
