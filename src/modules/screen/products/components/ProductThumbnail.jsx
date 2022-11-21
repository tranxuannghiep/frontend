import React from 'react';
import { Box } from '@mui/material';
import { THUMBNAIL_PLACEHOLDER } from 'utils';

export default function ProductThumbnail({ product }) {
  const thumbnailUrl = product.image.length > 0
    ? product.image[0]
    : THUMBNAIL_PLACEHOLDER;
  return (
    <Box>
      <img style={{ aspectRatio: "1/1" }} src={thumbnailUrl} alt={product.name} width="100%" />
    </Box>
  );
}
