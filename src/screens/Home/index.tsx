import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';
import { useTheme } from 'styled-components';

import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';
import HappyEmoji from '@assets/happy.png';
import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  Title,
  MenuItemsNumber
} from './styles';

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');

  const { user } = useAuth();
  const theme = useTheme();

  function fetchProducts(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();
    firestore()
      .collection('products')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`) //limite da consulta
      .get()
      .then((response) => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[];
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Pesquisa', 'Não foi possível realizar a busca por produtos!');
      })
  }

  async function handleSearch() {
    fetchProducts(search);
  }

  async function handleClear() {
    setSearch('');
    fetchProducts('');
  }

  useEffect(() => {
    fetchProducts(''); // passando '' essa função vai trazer todos os produtos registrados
  }, []);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={HappyEmoji} />
          <GreetingText>Olá, garçom</GreetingText>
        </Greeting>
        <TouchableOpacity>
          <MaterialIcons name='logout' color={theme.COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search

        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 hamburguers</MenuItemsNumber>
      </MenuHeader>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24
        }}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
      />
    </Container>
  );
}
