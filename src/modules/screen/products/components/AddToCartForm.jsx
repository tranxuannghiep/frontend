import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@mui/material';
import { InputField } from 'components/FormFields';

export default function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .min(1, 'Mininum value is 1')
      .required('Please enter quantity')
      .typeError('Please enter a number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField label="Quantity" name="quantity" control={form.control} typeInput="positive" />
      <Button type="submit" variant="contained" color="primary" style={{ width: '250px' }}>
        Add to cart
      </Button>
    </form>
  );
}
