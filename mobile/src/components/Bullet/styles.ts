import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  active: boolean;
}

export const Container = styled.View<Props>`
  width: ${RFValue(6)}px;
  height: ${RFValue(6)}px;
  border-radius: ${RFValue(3)}px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
  margin-left: 8px;
`;
