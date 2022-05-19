import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLogging: boolean;
  user: User | null;
}

type AuthProviderProps = {
  children: ReactNode;
}

const USER_COLLECTION = '@makeBurguer:users';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return ToastAndroid.show('É necessário informar email e senha para continuar', ToastAndroid.SHORT);
    }
    setIsLogging(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(account => {
        console.log(account);
        firestore()
          .collection('users')
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;
            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              };
              console.log(userData);
              await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
              setUser(userData);
            }
          })
          .catch(() => ToastAndroid.show('Não possível buscar os dados de perfil do usuário', ToastAndroid.LONG))
      })
      .catch(error => {
        const { code } = error;
        console.log('--------------------- ', code)
        if (code === "auth/user-not-found" || code === "auth/wrong-password") {
          return ToastAndroid.show('Email e/ou senha inválidos', ToastAndroid.LONG);
        } else {
          return ToastAndroid.show('Não foi possível realizar Login', ToastAndroid.LONG);
        }
      })
      .finally(() => setIsLogging(false));
  }

  //buscando usuario autenticado no AsyncStorage
  async function loadUserStorageData() {
    setIsLogging(true);
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      console.log(userData);
      setUser(userData);
    }
    setIsLogging(false);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return ToastAndroid.show('Para redefinição de senha, informe um email', ToastAndroid.LONG);
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Redefinição de senha', 'Um link para redefinição de senha foi enviado em seu email!'))
      .catch(() => Alert.alert('Redefinição de senha', 'Não foi possível enviar o email de redefinição de senha!'));
  }

  async function signOut() {
    //deslogar -> sair do FirebaseAuth, remover usuario da coleção do 
    // AsyncStorage, settar estado de usuario logado como null
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      forgotPassword,
      isLogging,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
