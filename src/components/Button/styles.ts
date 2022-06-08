import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type: TypeProps;
}

export const Container = styled(RectButton) <ContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  max-height: 56px;
  min-height: 56px;
  border-radius: 12px;
  background-color: ${({ theme, type }) => type === 'primary' ? theme.COLORS.PRIMARY_900 : theme.COLORS.SUCCESS_900};
`;

export const Title = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE}
  `};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE
}))``;
