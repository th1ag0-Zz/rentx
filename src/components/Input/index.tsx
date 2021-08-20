import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export const Input: React.FC<InputProps> = ({ iconName }) => {
  const { colors } = useTheme();
  return (
    <Container>
      <Feather name={iconName} size={24} color={colors.text} />

      <TextInput />
    </Container>
  );
};
