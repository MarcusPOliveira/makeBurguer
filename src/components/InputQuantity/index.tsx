import React, { useState } from 'react';
import { ToastAndroid, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
  Container,
  Less,
  More,
  Result
} from './styles';

type Props = TextInputProps & {
  setInputQuantity: (value: number) => void;
  inputQuantity: number;
}

export function InputQuantity({ setInputQuantity, inputQuantity, ...rest }: Props) {

  const theme = useTheme();

  function handleRemove() {
    const result = inputQuantity - 1;
    if (result < 1) {
      ToastAndroid.show('A quantidade mínima não pode ser menor que 1', ToastAndroid.SHORT);
    } else {
      setInputQuantity(result);
    }
  }

  function handleAdd() {
    const result = inputQuantity + 1;
    setInputQuantity(result);
  }

  return (
    <Container>
      <Less onPress={handleRemove} >
        <MaterialIcons name="remove" size={24} color={theme.COLORS.SHAPE} />
      </Less>
      <Result
        {...rest}
        editable={false}
        value={inputQuantity.toString()}
      />
      <More onPress={handleAdd}>
        <MaterialIcons name="add" size={24} color={theme.COLORS.SHAPE} />
      </More>
    </Container>
  );
}
