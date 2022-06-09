# 🍔 makeBurguer 🍔

Aplicação mobile para auxílio de garçons em uma hambúrgueria. O app conta com um pré-registro de administradores que podem efetuar tanto o cadastro de novos hambúrgueres, quanto a edição dos dados de um existente. Na versão do Garçom, ele pode efetuar um pedido e também acompanhar o processo de preparo do mesmo.

## 📖 Objetivo

Avançar no aprendizado de alguns recursos, como:
- Recursos do Firebase:
    - Firestore Database (adição, listagem, edição e exclusão de produtos)
    - Authentication (login com email e senha, recuperação de senhas)
    - Storage (armazenamento de imagens)
- Pesquisa utilizando filtros
- Hooks de autenticação
- Persistência de usuário com async storage
- Renderização de interfaces/componentes condicional (se o usuário é admin ou garçom)
- Componentes personalizados

## 💡 Futura implementação
- Funcionalidade em que o Admin poderá atualizar o status do pedido pelo app, refletindo na tela de Pedidos do Garçom

## 📱 Layout

<p float="left">
    https://user-images.githubusercontent.com/47436367/172855282-3e9852ea-b3dd-4e0c-8008-bc4cd7f47257.mp4
    https://user-images.githubusercontent.com/47436367/172855433-439d990a-e2b0-4fdf-aa05-37e1f5192221.mp4
    https://user-images.githubusercontent.com/47436367/172855480-2ec6b33e-51ba-412d-aaf3-619bf3fba0b8.mp4
</p>

## ⚛ Principais Tecnologias / Bibliotecas utilizadas
- [React Native](https://reactnative.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Expo Bare Workflow](https://docs.expo.dev/)
- [Styled Components](https://styled-components.com/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Firebase](https://rnfirebase.io/)
- [React Native Async Storage](https://reactnative.dev/docs/asyncstorage)

## 🔧 Executando a aplicação
1. Efetue o download desse projeto em sua máquina ou clone usando o comando ``git clone https://github.com/MarcusPOliveira/makeBurguer``
2. Abra a pasta ``makeBurguer`` em seu Prompt de preferência
3. Rode o comando ``yarn install`` ou ``npm install`` para instalar a pasta ``node_modules``
4. Execute o comando ``npx react-native run-android`` para rodar a aplicação com seu emulador de preferência ou dispositivo físico.
5. Com propósitos de testes, utilize as seguintes credenciais (só funcionam nesse app) para logar:</br>
    admin</br>
      email: admin@admin.com</br>
      senha: 123123</br></br>
    garçom</br>
        email: garcom@garcom.com</br>
        senha: 123123
