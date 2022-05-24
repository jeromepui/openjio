import React from 'react';
import { FormControl, FormLabel, Input, Grid, GridItem } from '@chakra-ui/react';

export default function SlotsField(props) {
  const MAX_PPL_ALLOWED = 10;

  return (
    <Grid templateColumns="repeat(10, 1fr)" width="100%">
      <GridItem colStart={3} colEnd={5}>
        <FormLabel htmlFor="slots" fontSize="md" fontWeight="md">Slots available</FormLabel>
      </GridItem>

      <GridItem colStart={5} colEnd={10}>
        <Input
          id="slots"
          type="number"
          w="10%"
          h="80%"
          {...props.register('slots', {
            required: {
              value: true,
              message: 'Please enter a number.',
            },
            min: {
              value: 0,
              message: 'Must be 0 and above',
            },
            max: {
              value: MAX_PPL_ALLOWED,
              message: `Cannot be more than :${MAX_PPL_ALLOWED}`,
            },
          })}
        />
      </GridItem>
    </Grid>
  );
}
