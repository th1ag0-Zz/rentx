import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  color?: string;
}

interface TextProps {
  light?: boolean;
}

export const Container = styled(RectButton)<Props>`
  width: 100%;
  padding: 18px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main};
`;

export const Title = styled.Text<TextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ light, theme }) =>
    light ? theme.colors.title : theme.colors.shape};
`;
