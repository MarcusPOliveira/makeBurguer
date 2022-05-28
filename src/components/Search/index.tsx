import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
  Container,
  InputArea,
  Input,
  ButtonClear,
  Button
} from './styles';

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
}

export function Search({ onSearch, onClear, ...rest }: Props) {

  const theme = useTheme();

  return (
    <Container>
      <InputArea>
        <Input
          placeholder='Pesquisar...'
          {...rest}
        />
        <ButtonClear onPress={onClear}>
          <Feather name='x' size={16} color={theme.COLORS.TEXT} />
        </ButtonClear>
      </InputArea>
      <Button onPress={onSearch}>
        <Feather name='search' size={16} color={theme.COLORS.TITLE} />
      </Button>
    </Container>
  );
}
