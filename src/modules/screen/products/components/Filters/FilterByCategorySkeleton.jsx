import React from 'react';
import { Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      marginTop: theme.spacing(1),
    },
  },
}));
function FilterByCategorySkeleton({ length = 6 }) {
  const classes = useStyles();

  return (
    <ul className={classes.menu}>
      {Array(length)
        .fill(0)
        .map((x, index) => (
          <li key={index}>
            <Skeleton />
          </li>
        ))}
    </ul>
  );
}

export default FilterByCategorySkeleton;
