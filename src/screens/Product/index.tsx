import React, { useState } from 'react';
import { Platform, ScrollView, ToastAndroid, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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

  async function handleAdd() {
    //validações dos campos (.trim() serve para evitar a digitação de spaces nos campos)
    if (!image) {
      return ToastAndroid.show('Selecione uma imagem para o produto', ToastAndroid.LONG);
    }
    if (!name.trim()) {
      return ToastAndroid.show('Informe o nome do produto', ToastAndroid.LONG);
    }
    if (!description.trim()) {
      return ToastAndroid.show('Informe a descrição do produto', ToastAndroid.LONG);
    }
    if (!priceSize120.trim() || !priceSize160.trim() || !priceSize200.trim()) {
      return ToastAndroid.show('Informe o preço de todos os tamanhos do produto', ToastAndroid.LONG);
    }

    setIsLoading(true);

    //download da imagem selecionada para armazenar no DB
    const fileName = new Date().getTime();
    const reference = storage().ref(`/products/${fileName}.png`);
    await reference.putFile(image); //endereço da imagem selecionada já está sendo salvo no estado
    const photo_url = await reference.getDownloadURL();
    console.log(photo_url);

    //salvando a imagem no DB
    firestore()
      .collection('products')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(), //salvando nome do produto em minúsculo e sem espaços para facilitar na manipulação (pesquisar/listar posteriormente)
        description,
        prices_sizes: {
          size120: priceSize120,
          size160: priceSize160,
          size200: priceSize200
        },
        photo_url,
        photo_path: reference.fullPath //pasta na qual a imagem está salva
      })
      .then(() => {
        ToastAndroid.show('Produto cadastrado com sucesso!', ToastAndroid.LONG);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível realizar o cadastro do produto');
      });
    setIsLoading(false);
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
            <Input
              onChangeText={setName}
              value={name}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupHeader>
              <Label> Descrição </Label>
              <MaxCharacters> 0 de 80 caractéres </MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={80}
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
          <Button
            title='Cadastrar produto'
            type='secondary'
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Forms>
      </ScrollView>
    </Container>
  );
}
