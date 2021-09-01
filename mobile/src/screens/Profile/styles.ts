import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface OptionProps {
  active?: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.header};
  height: ${RFValue(227)}px;
  padding: ${StatusBar.currentHeight! + 30}px 24px 0;
  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(25)}px;
`;

export const LogOutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: ${RFValue(180)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: ${RFValue(48)}px;
  position: relative;
`;

export const Photo = styled.Image`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: ${RFValue(180)}px;
`;

export const PhotoButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.main};
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: ${RFValue(122)}px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 24px;
  padding: 0 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 8px;
  border-bottom-width: 3px;
  border-bottom-color: ${({ active, theme }) =>
    active ? theme.colors.main : theme.colors.background_primary};
`;

export const OptionName = styled.Text<OptionProps>`
  font-family: ${({ active, theme }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
  font-size: ${RFValue(20)}px;
  color: ${({ active, theme }) =>
    active ? theme.colors.header : theme.colors.text_datail};
`;

export const Section = styled.View``;
