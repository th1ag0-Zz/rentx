import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<Props> = ({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <Container
      enabled={enabled}
      {...rest}
      color={color}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
};
