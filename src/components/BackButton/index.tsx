import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export const BackButton: React.FC<Props> = ({ color, ...rest }) => {
  const { colors } = useTheme();
  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={RFValue(24)}
        color={color ? color : colors.text}
      />
    </Container>
  );
};
