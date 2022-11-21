import { Tab, Tabs } from '@mui/material';
import React from 'react';

export default function ProductSort({ currentSort, onChange }) {
  const handleChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };
  return (
    <Tabs value={currentSort} onChange={handleChange} aria-label="disabled tabs example">
      <Tab label="Giá thấp tới cao" value="asc" />
      <Tab label="Giá cao xuống thấp" value="desc" />
    </Tabs>
  );
}
