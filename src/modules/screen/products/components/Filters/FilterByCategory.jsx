import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FilterByCategorySkeleton from './FilterByCategorySkeleton';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
// import categoryApi from 'api/categoryApi';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',
      '&:hover': {
        // color: theme.palettte.primary.dark,
        cursor: 'pointer',
      },
    },
  },
}));

export default function FilterByCategory({ onChange }) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const list = await axios.get(API_PATHS.getCategoryList);
        setCategoryList(
          list.data.data.map((x) => ({
            id: x._id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed', error);
      }
      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) onChange(category.id);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      {loading ? (
        <FilterByCategorySkeleton />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant="body2" style={{ textTransform: "uppercase" }}>{category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}
