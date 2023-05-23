import styled from '@emotion/styled';
import { FlexCentered } from 'styles/shared';

export const PageHeader = styled.header`
  ${FlexCentered()};

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 55px;
  background-color: var(--color-black);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto 0 auto;
  width: ${({ width }) => width || '100wh'};
`;
