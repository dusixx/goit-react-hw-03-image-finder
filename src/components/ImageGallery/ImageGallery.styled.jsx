import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: var(--gallery-items-gap);
  margin-top: calc(var(--header-height) + 10px);
  margin-bottom: 30px;
  width: 100%;
`;

export const ListItem = styled.li`
  position: relative;
  height: 100px;

  flex-basis: calc(
    (100% - var(--gallery-items-gap) * (var(--gallery-items-per-row) - 1)) /
      (var(--gallery-items-per-row))
  );

  border-radius: var(--border-radius);
  overflow: hidden;

  @media screen and (min-width: 320px) {
    height: 150px;
  }

  @media screen and (min-width: 560px) {
    --gallery-items-per-row: 2;
  }

  @media screen and (min-width: 768px) {
    height: 180px;
    --gallery-items-per-row: 3;
  }

  @media screen and (min-width: 1200px) {
    height: 200px;
    --gallery-items-per-row: 4;
  }

  transition-property: filter, transform;
  transition-timing-function: var(--trans-func);
  transition-duration: var(--trans-duration);

  &:hover,
  &:focus-visible {
    filter: brightness(1.1);
    transform: scale(1.05);
  }
`;

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
  position: relative;

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
