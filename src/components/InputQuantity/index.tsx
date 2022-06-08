import React, { useState } from 'react';
import { ToastAndroid, TouchableOpacityProps, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
  Container,
  Less,
  More,
  Result
} from './styles';

type Props = TextInputProps & {

}

export function InputQuantity({ ...rest }: Props) {
  const [showQuantity, setShowQuantity] = useState(1);

  const theme = useTheme();

  function handleRemove() {
    const result = showQuantity - 1;
    if (result < 1) {
      ToastAndroid.show('A quantidade mínima não pode ser menor que 1', ToastAndroid.SHORT);
    } else {
      setShowQuantity(result);
    }
  }

  function handleAdd() {
    const result = showQuantity + 1;
    setShowQuantity(result);
  }

  return (
    <Container>
      <Less onPress={handleRemove} >
        <MaterialIcons name="remove" size={24} color={theme.COLORS.SHAPE} />
      </Less>
      <Result
        {...rest}
        editable={false}
        value={showQuantity.toString()}
      />
      <More onPress={handleAdd}>
        <MaterialIcons name="add" size={24} color={theme.COLORS.SHAPE} />
      </More>
    </Container>
  );
}
