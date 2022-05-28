import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
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
  const [search, setSearch] = useState('');

  const theme = useTheme();

  return (
    <Container>
      <InputArea>
        <Input
          placeholder='Pesquisar...'
          {...rest}
          onChangeText={search}
        />
        <ButtonClear onPress={onClear}>
          <Feather name='x' size={16} color={theme.COLORS.TEXT} />
        </ButtonClear>
      </InputArea>
      <Button>
        <Feather name='search' size={16} color={theme.COLORS.TITLE} />
      </Button>
    </Container>
  );
}
