import React, { useState } from 'react';
import { ToastAndroid, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
  Container,
  Less,
  More,
  Result
} from './styles';

export function InputQuantity() {
  const [quantity, setQuantity] = useState(1);

  const theme = useTheme();

  function handleRemove() {
    const result = quantity - 1;
    if (result < 1) {
      ToastAndroid.show('A quantidade mínima não pode ser menor que 1', ToastAndroid.SHORT);
    } else {
      setQuantity(result);
    }
  }

  function handleAdd() {
    const result = quantity + 1;
    setQuantity(result);
  }

  return (
    <Container>
      <Less onPress={handleRemove} >
        <MaterialIcons name="remove" size={24} color={theme.COLORS.SHAPE} />
      </Less>
      <Result
        editable={false}
        value={quantity.toString()}
      />
      <More onPress={handleAdd}>
        <MaterialIcons name="add" size={24} color={theme.COLORS.SHAPE} />
      </More>
    </Container>
  );
}
