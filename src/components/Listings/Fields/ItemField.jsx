import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function ItemField(props) {
  return (
    <FormControl>
      <FormLabel htmlFor="item">Item on sale</FormLabel>
      <Input
        id="item"
        type="text"
        {...props.register('item', {
          required: {
            value: true,
            message: 'Please enter name of promotional item.',
          },
        })}
      />
    </FormControl>
  );
}
