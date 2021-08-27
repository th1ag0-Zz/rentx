import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

// import styles from './styles';

export const Load: React.FC = () => {
  const { colors } = useTheme();

  return (
    <ActivityIndicator size="large" color={colors.main} style={{ flex: 1 }} />
  );
};
