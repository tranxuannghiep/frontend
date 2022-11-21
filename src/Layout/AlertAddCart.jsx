import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { closeToolTipCart } from 'modules/screen/products/redux/visibleAction';
const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: '#4caf50',
    marginRight: '5px',
  },
  btn: {
    backgroundColor: '#ff3945 !important',
    fontSize: '14px !important',
    textTransform: 'inherit !important',
    fontWeight: '400 !important',
    color: '#fff !important',
    marginTop: '14px !important',
    width: '260px !important',
  },
  close: {
    position: 'absolute !important',
    top: 0,

    right: 0,
    '& > svg': {
      fontSize: '18px',
    },
  },
}));
export default function AlertAddCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const handleClickButton = () => {
    navigate('/cart');
    dispatch(closeToolTipCart());
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <CheckCircleIcon className={classes.icon} />
        <Typography variant="body2">Thêm vào giỏ hàng thành công!</Typography>
      </Box>
      <Button className={classes.btn} fullWidth onClick={handleClickButton}>
        Xem giỏ hàng và thanh toán
      </Button>
      <IconButton className={classes.close} onClick={() => dispatch(closeToolTipCart())}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
