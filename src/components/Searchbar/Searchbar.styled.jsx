import styled from '@emotion/styled';
import { ButtonPrimary, FlexCentered } from 'styles/shared';

export const SearchBtn = styled(ButtonPrimary)`
  height: ${({ height }) => height || '100%'};
  border-radius: unset;
  border-bottom-right-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);

  &[disabled],
  &[disabled='true'] {
    opacity: 1;
    filter: grayscale(0.2);
  }
`;

export const SearchForm = styled.form`
  ${FlexCentered()};
  height: ${({ height }) => height || '100%'};
  width: 90%;

  @media screen and (min-width: 1200px) {
    width: 60%;
  }
`;
