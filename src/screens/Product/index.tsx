import React, { useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import { BackButton } from '@components/BackButton';
import { Photo } from '@components/Photo';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import {
  Container,
  Header,
  Title,
  DeleteLabel,
  PickImageButton,
  Upload,
  Forms,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters
} from './styles';

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSize120, setPriceSize120] = useState('');
  const [priceSize160, setPriceSize160] = useState('');
  const [priceSize200, setPriceSize200] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
      <ScrollView showsVerticalScrollIndicator={false} >
        <Header>
          <BackButton />
          <Title> Cadastrar </Title>
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>
        <Upload>
          <Photo uri={image} />
          <PickImageButton title='Carregar' type='primary' onPress={handlePickerImage} />
        </Upload>
        <Forms>
          <InputGroup>
            <Label> Nome do Produto </Label>
            <Input onChangeText={setName} value={name} />
          </InputGroup>
          <InputGroup>
            <InputGroupHeader>
              <Label> Descrição </Label>
              <MaxCharacters> 0 de 60 caractéres </MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>
          <InputGroup>
            <Label> Tamanhos e preços </Label>
            <InputPrice size='120g' onChangeText={setPriceSize120} value={priceSize120} />
            <InputPrice size='160g' onChangeText={setPriceSize160} value={priceSize160} />
            <InputPrice size='200g' onChangeText={setPriceSize200} value={priceSize200} />
          </InputGroup>
          <Button title='Cadastrar produto' type='secondary' isLoading={isLoading} />
        </Forms>
      </ScrollView>
    </Container>
  );
}
