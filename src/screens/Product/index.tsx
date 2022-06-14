import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, ToastAndroid, Alert, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ProductProps } from '@components/ProductCard';
import { ProductNavigationProps } from 'src/@types/navigation';
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

type ProductResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    size120: string;
    size160: string;
    size200: string;
  };
}

export function Product() {
  const [image, setImage] = useState(''); //link de exibição da imagem
  const [photoPath, setPhotoPath] = useState(''); //referência de onde a imagem está salva no DB
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSize120, setPriceSize120] = useState('');
  const [priceSize160, setPriceSize160] = useState('');
  const [priceSize200, setPriceSize200] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps; //recuperando id baseado no produto selecionado
  console.log('ID do produto: ', id);

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

    //salvando o produto no DB
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
        navigation.navigate('home');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível realizar o cadastro do produto');
      });
    setIsLoading(false);
  }

  async function handleDelete() {
    firestore()
      .collection('products')
      .doc(id)
      .delete()
      .then(() => {
        storage()
          .ref(photoPath)
          .delete()
          .then(() => {
            ToastAndroid.show('Produto deletado com sucesso!', ToastAndroid.SHORT);
            navigation.navigate('home');
          });
      });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('products')
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as ProductResponse;
          setName(product.name);
          setImage(product.photo_url);
          setPhotoPath(product.photo_path);
          setDescription(product.description);
          setPriceSize120(product.prices_sizes.size120);
          setPriceSize160(product.prices_sizes.size160);
          setPriceSize200(product.prices_sizes.size200);

        })
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
      <ScrollView showsVerticalScrollIndicator={false} >
        <Header>
          <BackButton onPress={handleGoBack} />
          <Title> Cadastrar </Title>
          {
            id ?
              <TouchableOpacity onPress={handleDelete} >
                <DeleteLabel>Deletar</DeleteLabel>
              </TouchableOpacity>
              : <View style={{ width: 40 }} />
          }
        </Header>
        <Upload>
          <Photo uri={image} />
          {
            !id &&
            <PickImageButton title='Carregar' type='primary' onPress={handlePickerImage} />
          }
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
              <MaxCharacters> Máx. de 200 caractéres </MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={200}
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
          {
            !id &&
            <Button
              title='Cadastrar Produto'
              type='secondary'
              isLoading={isLoading}
              onPress={handleAdd}
            />
          }
        </Forms>
      </ScrollView>
    </Container>
  );
}
