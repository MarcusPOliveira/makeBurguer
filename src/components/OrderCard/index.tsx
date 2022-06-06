import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
  StatusTypesProps
} from './styles';

type Props = TouchableOpacityProps & {
  index: number;
}

export function OrderCard({ index, ...rest }: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: 'https://media.gazetadopovo.com.br/2021/05/24202047/hamburguer-janelabar-divulgacao-960x540.jpg' }} />
      <Name>Nome do produto</Name>
      <Description>Mesa 01 ● Qtde: 1</Description>
      <StatusContainer status='Preparando' >
        <StatusLabel status='Preparando'>Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
