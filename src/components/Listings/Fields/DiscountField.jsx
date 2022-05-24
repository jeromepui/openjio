import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function DiscountField(props) {
  return (
    <FormControl>
      <FormLabel htmlFor="discount">Discount</FormLabel>
      <Input
        id="discount"
        type="number"
        {...props.register('discount', {
          required: {
            value: true,
            message: 'Please enter a number.',
          },
          validate: {
            positive: v => parseInt(v) > 0 || 'Should be greater than 0',
            wholeNumber: v => Number.isInteger(v) || 'Should be a whole number',
          },
        })}
      />
    </FormControl>
  );
}
