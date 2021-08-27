import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, InputText } from './styles';

interface InputPassword extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export const InputPassword: React.FC<InputPassword> = ({
  iconName,
  value,
  ...rest
}) => {
  const { colors } = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function hanldeVisibilityPassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={RFValue(22)}
          color={isFocused || isFilled ? colors.main : colors.text_datail}
        />
      </IconContainer>

      <InputText
        secureTextEntry={!isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        isFocused={isFocused}
        {...rest}
      />

      <BorderlessButton onPress={hanldeVisibilityPassword}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={RFValue(22)}
            color={colors.text_datail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
};
