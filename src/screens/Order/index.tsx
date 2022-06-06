import React, { useState } from 'react';
import { Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { PRODUCT_TYPES } from '@utils/productTypes';
import { BackButton } from '@components/BackButton';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { InputQuantity } from '@components/InputQuantity';
import {
  Container,
  ContentScroll,
  Header,
  Photo,
  Forms,
  Sizes,
  Title,
  Label,
  FormRow,
  InputGroup,
  Price
} from './styles';

export function Order() {
  const [size, setSize] = useState('');

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header>
          <BackButton
            onPress={handleGoBack}
            style={{ marginBottom: 108 }}
          />
        </Header>
        <Photo source={{ uri: 'https://media.gazetadopovo.com.br/2021/05/24202047/hamburguer-janelabar-divulgacao-960x540.jpg' }} />
        <Forms>
          <Title>Nome do Produto</Title>
          <Label>Selecione o tamanho do burguer</Label>
          <Sizes>
            {
              PRODUCT_TYPES.map(item => (
                <RadioButton
                  key={item.id}
                  title={item.name}
                  onPress={() => setSize(item.id)}
                  selected={size === item.id}
                />
              ))
            }
          </Sizes>
          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                keyboardType='numeric'
              />
            </InputGroup>
            <InputGroup>
              <Label>Quantidade</Label>
              <InputQuantity

              />
            </InputGroup>
          </FormRow>
          <Price>Valor de R$ 00,00</Price>
          <Button
            title='Confirmar Pedido'
            type='secondary'
          />
        </Forms>
      </ContentScroll>
    </Container>
  );
}
