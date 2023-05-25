import styled from '@emotion/styled';
import { FlexCentered } from 'styles/shared';

export const Link = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;

  object-fit: cover;
  object-position: center;
`;

export const Thumb = styled.div`
  position: absolute;

  & img {
    height: 70vh;
    width: auto;
    max-width: 70vw;

    object-fit: cover;
    object-position: center;
  }
`;

export const Desc = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;

  width: 100%;
  height: 30px;
  padding: 20px;

  background-color: var(--color-black);
  color: white;
  opacity: 0.9;
`;

export const Container = styled.div`
  position: relative;
  ${FlexCentered()};

  & :nth-of-type() {
    position: absolute;
    top: 0;
    left: 0;
  }
`;