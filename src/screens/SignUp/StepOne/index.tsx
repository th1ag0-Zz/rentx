import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
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
import { Alert } from 'react-native';

export const StepOne: React.FC = () => {
  const { goBack, navigate } = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  function handleBack() {
    goBack();
  }

  async function handleSubmit() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH obrigatório'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail obrigatório'),
        name: Yup.string().required('Nome obrigatório'),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigate('StepTwo', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Bullets>
              <Bullet active />
              <Bullet />
            </Bullets>
          </Header>

          <Title>{'Crie sua\nconta'}</Title>
          <Subtitle>{'Faça seu cadastro de\nforma rápida e fácil'}</Subtitle>

          <Form>
            <FormTitle>{'1. Dados'}</FormTitle>

            <Input
              value={name}
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
            />
            <Input
              value={email}
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <Input
              value={driverLicense}
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleSubmit} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
