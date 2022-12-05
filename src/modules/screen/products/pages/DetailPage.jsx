import React, { useState } from 'react';
import {
  Box, Container, Grid, LinearProgress, Paper, Typography, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useProductDetail from '../hooks/useProductDetail';
import ProductThumbnail from '../components/ProductThumbnail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import { addToCart, clearCart } from '../redux/cartAction';
import { openToolTipCart } from '../redux/visibleAction';
import { Button } from '@mui/material';
import { FcShop } from "react-icons/fc";
import { ROUTES } from 'configs/routes';
import { addIdShop } from './../redux/cartAction';

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading: {
    width: 500,
    margin: 'auto',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
}));

export default function DetailPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { productId } = useParams();
  const { product, loading } = useProductDetail(productId);
  const { idShop, carts } = useSelector(state => state.cartReducer)
  const [open, setOpen] = useState(false);
  const [quantityProduct, setQuantityProduct] = useState(0)
  if (loading)
    return (
      <Box className={classes.loading}>
        <Typography textAlign="center" marginBottom="10px">
          Loading
        </Typography>
        <LinearProgress />
      </Box>
    );

  const handleAddtoCartSubmit = (values) => {
    if (idShop !== product.author._id && idShop !== "" && carts.length > 0) {
      setQuantityProduct(values.quantity)
      setOpen(true)
    } else {
      const { quantity } = values;
      dispatch(addToCart({ ...product, quantity: quantity }));
      dispatch(openToolTipCart());
      dispatch(addIdShop(product.author._id))
    }
  };

  const handleChangeShop = () => {
    dispatch(clearCart())
    dispatch(addIdShop(product.author._id))
    dispatch(addToCart({ ...product, quantity: quantityProduct }));
    dispatch(openToolTipCart())
    setOpen(false)
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Box my={2}>
          <Button variant='contained' onClick={() => navigate(-1)}>Quay lại</Button>
        </Box>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddtoCartSubmit} />
              <Box py={2} display="flex" alignItems="center">
                <FcShop
                  fontSize={40}
                  cursor="pointer"
                  style={{ marginRight: 10 }}
                  onClick={() => navigate(`/${ROUTES.shop}/${product.author._id}`)}
                />
                <Typography variant='h6'>{product.author.name}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Dialog
        open={open}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={(_, reason) => {
          if (reason !== 'backdropClick') {
            setOpen(false);
          }
        }}
      >
        <Box padding={1.5}>
          <DialogTitle id="alert-dialog-title" style={{ display: 'flex', alignItems: 'center' }}>
            <WarningAmberOutlinedIcon style={{ marginRight: '10px', color: '#f1c40f' }} />{' '}
            <Typography>Thay đổi shop</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có muốn thay đổi shop ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleChangeShop}>
              Xác nhận
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)} autoFocus>
              Hủy
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
