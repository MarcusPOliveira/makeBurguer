import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useAuth } from '@hooks/auth';
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

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, isLogging, forgotPassword } = useAuth();

  function handleSignIn() {
    signIn(email, password);
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
        <Content>
          <Brand source={BrandImg} />
          <Title> Entre com sua conta </Title>
          <Input
            placeholder='Email'
            style={{ backgroundColor: 'transparent' }}
            type='secondary'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            onChangeText={setEmail}
          />
          <Input
            placeholder='Senha'
            style={{ backgroundColor: 'transparent' }}
            type='secondary'
            autoCorrect={false}
            secureTextEntry
            onChangeText={setPassword}
          />
          <ForgotPasswordButton onPress={handleForgotPassword} >
            <ForgotPasswordLabel>
              Esqueci minha senha
            </ForgotPasswordLabel>
          </ForgotPasswordButton>
          <Button
            title='Entrar'
            type='primary'
            isLoading={isLogging}
            onPress={handleSignIn}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
