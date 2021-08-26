import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  padding-top: 96px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)}px;

  margin-top: 30px;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text_datail};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(35)}px;
  text-align: center;
  margin-top: 16px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 80px;
`;
