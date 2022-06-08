import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';
import { OrderCard, OrderProps } from '@components/OrderCard';
import { ItemSeparator } from '@components/ItemSeparator';
import {
  Container,
  Header,
  Title
} from './styles';

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const { user } = useAuth();

  function handleUpdateStatus(id: string) {
    firestore()
      .collection('orders')
      .doc(id)
      .update({
        status: 'Entregue'
      });
  }

  function handleProductDelivered(id: string) {
    Alert.alert('Pedido', 'Confirmar que o produto foi entregue?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => handleUpdateStatus(id),
        style: 'cancel',
      }
    ]);
  }

  useEffect(() => {
    //visualização de pedidos em tempo real
    const subscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id) //pegando id do Garçom que está logado, visando exibir somente os seus pedidos
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as OrderProps[];
        setOrders(data);
      });
    //função de limpeza
    return () => subscribe();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos efetuados</Title>
      </Header>
      <FlatList
        numColumns={2}
        ItemSeparatorComponent={() => <ItemSeparator />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === 'Entregue'}
            onPress={() => handleProductDelivered(item.id)}
          />
        )}
      />
    </Container>
  );
}
