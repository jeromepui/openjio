import React from 'react';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';

export default function MinRequirementField(props) {
  const [currentSpend, setCurrentSpend] = useState(0);

  return (
    <FormControl>
      <FormLabel htmlFor="currentSpend">Progress to hit min. spend </FormLabel>
      <Input
        id="currentSpend"
        type="number"
        w="7%"
        {...props.register('currentSpend', {
          required: {
            value: true,
            message: 'Please enter a number.',
          },
          validate: {
            positive: v => parseInt(v) > 0 || 'Should be greater than 0',
            wholeNumber: v => Number.isInteger(v) || 'Should be a whole number',
          },
          onChange: e => setCurrentSpend(e),
        })}
      />

      <Box display="inline" margin='0.2rem'> out of </Box>

      <Input
        id="target"
        type="number"
        w="7%"
        {...props.register('target', {
          required: {
            value: true,
          },
          validate: {
            positive: v =>
              parseInt(v) > currentSpend ||
              'Should be greater than current progress.',
            wholeNumber: v => Number.isInteger(v) || 'Should be a whole number',
          },
        })}
      />
    </FormControl>
  );
}
