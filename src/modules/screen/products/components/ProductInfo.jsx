import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatPrice } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {},

  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    width: 'fit-content',
  },
  category: {
    display: "flex",

  }

}));
export default function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { title, description, price, category } = product;
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {title}
      </Typography>
      <Box className={classes.description}>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Box className={classes.category}>
        <Typography variant="body2" marginRight={1} marginBottom={2}>Category: </Typography>
        <Typography variant="body2">{category.name} </Typography>
      </Box>
      <Box className={classes.priceBox}>
        <Box
          component="span"
        >
          {formatPrice(price)}
        </Box>
      </Box>
    </Box>
  );
}
