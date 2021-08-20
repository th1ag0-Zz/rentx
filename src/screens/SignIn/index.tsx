import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

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

  return (
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
        <Input iconName="mail" />
        <Input iconName="lock" />
      </Form>

      <Buttons>
        <Button
          title="Login"
          enabled={true}
          loading={false}
          onPress={() => {}}
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
  );
};
