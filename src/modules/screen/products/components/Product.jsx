import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice, THUMBNAIL_PLACEHOLDER } from 'utils';
import { FcShop } from 'react-icons/fc';
import { ROUTES } from 'configs/routes';

export default function Product({ product }) {
  const navigate = useNavigate()
  const thumbnailUrl = product.image.length > 0
    ? product.image[0]
    : THUMBNAIL_PLACEHOLDER;
  return (
    <Box padding={1}>
      <Link to={`/products/${product._id}`}>
        <Box minHeight={215} marginBottom={1}>
          <img style={{ aspectRatio: "1/1" }} src={thumbnailUrl} alt={product.name} width="100%" />
        </Box>
      </Link>
      <Typography variant="body2" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{product.title}</Typography>
      <Typography variant="body2">
        <Box component="span" mr={1} fontSize="16px" fontWeight="bold">
          {formatPrice(product.price)}
        </Box>
      </Typography>
      <Box py={1} display="flex" alignItems="center">
        <FcShop
          fontSize={20}
          cursor="pointer"
          style={{ marginRight: 10 }}
          onClick={() => navigate(`/${ROUTES.shop}/${product.author._id}`)}
        />
        <Typography variant='body2'>{product.author.name}</Typography>
      </Box>
    </Box>
  );
}
