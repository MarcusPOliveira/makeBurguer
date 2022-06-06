import React from 'react';
import { FlatList } from 'react-native';

import { OrderCard } from '@components/OrderCard';
import { ItemSeparator } from '@components/ItemSeparator';
import {
  Container,
  Header,
  Title
} from './styles';

export function Orders() {
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
        data={['1', '2', '3', '4', '5', '6', '7']}
        keyExtractor={item => item}
        renderItem={({ item, index }) => (
          <OrderCard index={index} />
        )}
      />
    </Container>
  );
}
