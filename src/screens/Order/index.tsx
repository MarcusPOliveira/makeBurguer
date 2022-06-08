import React, { useState, useEffect } from 'react';
import { Alert, Platform, ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';

import { OrderNavigationProps } from 'src/@types/navigation';
import { PRODUCT_TYPES } from '@utils/productTypes';
import { BackButton } from '@components/BackButton';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ProductProps } from '@components/ProductCard';
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

type ProductResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number;
  }
}

export function Order() {
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tableNumber, setTableNumber] = useState('');
  const [sendingOrder, setSendingOrder] = useState(false);
  const [product, setProduct] = useState<ProductResponse>({} as ProductResponse);

  const navigation = useNavigation();
  const { user } = useAuth();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  //const amount = size ? product.prices_sizes[size] * quantity : '0,00'
  const amount = size ? (product.prices_sizes[size]) * (quantity) : '0,00';

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleOrder() {
    if (!size) {
      return ToastAndroid.show('Selecione o tamanho do burguer!', ToastAndroid.SHORT);
    }
    if (!tableNumber) {
      return ToastAndroid.show('Informe o número da mesa!', ToastAndroid.SHORT);
    }
    setSendingOrder(true);
    //salvando o pedido no firestore
    firestore()
      .collection('orders')
      .add({
        quantity,
        amount,
        product: product.name,
        size,
        table_number: tableNumber,
        status: 'Preparando',
        waiter_id: user?.id,
        image: product.photo_url
      })
      .then(() => {
        ToastAndroid.show('Pedido efetuado com sucesso. Status: Preparando', ToastAndroid.LONG);
        navigation.navigate('home');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Pedido', 'Não foi possível realizar o pedido!');
        setSendingOrder(false);
      })
  }

  //carreagndo dados dos pedidos
  useEffect(() => {
    if (id) {
      firestore()
        .collection('products')
        .doc(id)
        .get()
        .then(response => {
          setProduct(response.data() as ProductResponse)
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Pedido', 'Não foi possível carregar o produto')
        });
      console.log(amount)
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header>
          <BackButton
            onPress={handleGoBack}
            style={{ marginBottom: 108 }}
          />
        </Header>
        <Photo source={{ uri: product.photo_url }} />
        <Forms>
          <Title>{product.name}</Title>
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
                value={tableNumber}
                onChangeText={setTableNumber}
              />
            </InputGroup>
            <InputGroup>
              <Label>Quantidade</Label>
              <InputQuantity
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>
          <Price>Valor Total de R$ {amount}</Price>
          <Button
            title='Confirmar Pedido'
            type='secondary'
            isLoading={sendingOrder}
            onPress={handleOrder}
          />
        </Forms>
      </ContentScroll>
    </Container>
  );
}
