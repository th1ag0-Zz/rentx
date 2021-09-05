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
import * as Yup from 'yup';
import { useNetInfo } from '@react-native-community/netinfo';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { Button } from '../../components/Button';

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
import { Alert } from 'react-native';

export const Profile: React.FC = () => {
  const netInfo = useNetInfo();
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { user, signOut, updateUser } = useAuth();

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
    Alert.alert(
      'Tem certeza',
      'Se sair, irá precisar de internet para conectar novamente',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Sim',
          onPress: () => signOut(),
        },
      ],
    );
  }

  function handleOptionChange(option: 'dataEdit' | 'passwordEdit') {
    setOptionEdit(option);
  }

  async function handleUpdateUser() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        name,
        email: user.email,
        driver_license: driverLicense,
        token: user.token,
        avatar,
      });

      Alert.alert('Perfil atualizado');
    } catch (error) {
      console.log(error);
    }
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

              {netInfo.isConnected && (
                <Option
                  active={optionEdit === 'passwordEdit'}
                  onPress={() => handleOptionChange('passwordEdit')}
                >
                  <OptionName active={optionEdit === 'passwordEdit'}>
                    {'Trocar senha'}
                  </OptionName>
                </Option>
              )}
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

            <Button title="Salvar alterações" onPress={handleUpdateUser} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
