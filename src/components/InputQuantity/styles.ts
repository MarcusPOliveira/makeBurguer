import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  display: flex;
  border-radius: 12px;
  flex-direction: row;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY_500};
`;

export const Less = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_900};
  width: 56px;
  height: 56px;
  border-radius: 12px;
  margin-left: -1px;
  align-items: center;
  justify-content: center;
`;

export const More = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
  width: 56px;
  height: 56px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

export const Result = styled.TextInput`
  width: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  ${({ theme }) => css`
    background-color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;
