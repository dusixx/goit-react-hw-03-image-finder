import styled from '@emotion/styled';
import { FlexCentered } from 'styles/shared';
import { ButtonPrimary } from 'styles/shared';

export const Header = styled.header`
  ${FlexCentered()};

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  width: 100%;
  height: var(--header-height);
  background-color: var(--color-black);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto 0 auto;
  padding: 20px;
  width: ${({ width }) => width || '100wh'};
`;

export const Button = styled(ButtonPrimary)`
  height: 40px;
  width: 120px;
`;
