import React from 'react';

import BrandImg from '@assets/brand.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel
} from './styles';
import { KeyboardAvoidingView, Platform } from 'react-native';

export function SignIn() {

  async function handleLogin() {

  }

  function handleForgotPassword() {

  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
        <Content>
          <Brand source={BrandImg} />
          <Title> Entre com sua conta </Title>
          <Input
            placeholder='Email'
            type='secondary'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
          />
          <Input
            placeholder='Senha'
            type='secondary'
            autoCorrect={false}
            secureTextEntry
          />
          <ForgotPasswordButton onPress={handleForgotPassword} >
            <ForgotPasswordLabel>
              Esqueci minha senha
            </ForgotPasswordLabel>
          </ForgotPasswordButton>
          <Button
            title='Entrar'
            type='primary'
            onPress={handleLogin}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
