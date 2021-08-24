import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Buttons,
  Form,
  Separator,
} from './styles';

export const SignIn: React.FC = () => {
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate({ email, password });

      // tudo certo até aqui
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Atenção!', error.message);
      } else {
        Alert.alert('Atenção!', error.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />

          <Header>
            <Title>{'Estamos\nquase lá.'}</Title>
            <Subtitle>
              {'Faça seu login para começar\numa experiência incrível.'}
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <InputPassword
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Buttons>
            <Button
              title="Login"
              enabled={true}
              loading={false}
              onPress={handleSignIn}
            />

            <Separator />

            <Button
              title="Criar conta gratuita"
              onPress={() => {}}
              enabled={true}
              color={colors.background_secondary}
              light
            />
          </Buttons>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
