import React, { useState, useCallback } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
  MenuItemsNumber,
  NewProductButton
} from './styles';

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');

  const { signOut, user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

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

  function handleOpen(id: string) {
    const route = user?.isAdmin ? 'product' : 'order';
    navigation.navigate(route, { id }); //passando id como parametro para rota tipada
  }

  function handleAdd() {
    navigation.navigate('product', {}); //chaves vazias para não passar nenhum parametro
  }

  function handleSignOut() {
    signOut();
  }

  // useFocusEffect ao invés de useEffect para voltar o foco para tela Home ao deletar um product
  useFocusEffect(
    useCallback(() => {
      fetchProducts(''); // passando '' essa função vai trazer todos os produtos registrados
    }, []));

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={HappyEmoji} />
          <GreetingText>Olá, garçom</GreetingText>
        </Greeting>
        <TouchableOpacity onPress={handleSignOut}>
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
        <MenuItemsNumber>{products.length} burguers</MenuItemsNumber>
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
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
      />
      {
        user?.isAdmin &&
        <NewProductButton
          title='Cadastrar Produto'
          type="primary"
          onPress={handleAdd}
        />
      }

    </Container>
  );
}
