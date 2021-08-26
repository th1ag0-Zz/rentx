import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { InputPassword } from '../../../components/InputPassword';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Bullets,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export const StepTwo: React.FC = () => {
  const { colors } = useTheme();
  const { navigate, goBack } = useNavigation<any>();
  const route = useRoute();

  const { user } = route.params as Params;

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleBack() {
    goBack();
  }

  async function handleSubmit() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Opa', 'Informe sua senha');
    }

    if (password !== passwordConfirm) {
      return Alert.alert('Opa', 'As senhas não são iguais');
    }

    navigate('Confirmation', {
      title: 'Conta criada!',
      message: '',
      nextScreenRoute: 'SignIn',
    });
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Bullets>
              <Bullet />
              <Bullet active />
            </Bullets>
          </Header>

          <Title>{'Crie sua\nconta'}</Title>
          <Subtitle>{'Faça seu cadastro de\nforma rápida e fácil'}</Subtitle>

          <Form>
            <FormTitle>{'2. Senha'}</FormTitle>

            <InputPassword
              value={password}
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
            />
            <InputPassword
              value={passwordConfirm}
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={colors.success}
            onPress={handleSubmit}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
