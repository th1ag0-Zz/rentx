import React from 'react';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWraper,
  CarImage,
} from './styles';

interface Props {
  imagesUrl: string[];
}

export const ImageSlider: React.FC<Props> = ({ imagesUrl }) => {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWraper>
        <CarImage source={{ uri: imagesUrl[0] }} resizeMode="contain" />
      </CarImageWraper>
    </Container>
  );
};
