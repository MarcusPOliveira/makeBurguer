import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '@hooks/auth';
import { useTheme } from 'styled-components';

import { Search } from '@components/Search';
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
import { ProductCard } from '@components/ProductCard';

export function Home() {

  const { user } = useAuth();
  const theme = useTheme();

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
        onSearch={() => { }}
        onClear={() => { }}
      />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 hamburguers</MenuItemsNumber>
      </MenuHeader>
      <ProductCard
        data={{
          id: '1',
          name: 'X Angus',
          description: 'algo',
          photo_url: 'https://github.com/MarcusPOliveira.png'
        }}
      />
    </Container>
  );
}
