import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
  Container
} from './styles';

export function BackButton({ ...rest }: TouchableOpacityProps) {

  const theme = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons name="chevron-left" size={18} color={theme.COLORS.TITLE} />
    </Container>
  );
}
