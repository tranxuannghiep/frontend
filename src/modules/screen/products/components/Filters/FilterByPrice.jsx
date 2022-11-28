import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '&>span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

export default function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    priceMin: 0,
    priceMax: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: Number(value),
    }));
  };
  const handleSubmit = () => {
    if (onChange) onChange(values);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>
      <Box className={classes.range}>
        <TextField
          type={"number"}
          name="priceMin"
          value={values.priceMin}
          onChange={handleChange}
          size="small"
        />
        <span>-</span>
        <TextField
          type={"number"}
          name="priceMax"
          value={values.priceMax}
          onChange={handleChange}
          size="small"
        />
      </Box>
      <Button variant="outlined" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  );
}
