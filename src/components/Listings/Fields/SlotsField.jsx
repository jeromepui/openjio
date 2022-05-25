import React from 'react';
import { FormLabel, Input, Grid, GridItem } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function SlotsField(props) {
  const MAX_PPL_ALLOWED = 10;

  return (
    <Grid templateColumns="repeat(15, 1fr)" width="100%" alignItems="center">
      <GridItem colStart={5} colEnd={8}>
        <FormLabel htmlFor="slots" fontSize="md" fontWeight="md">
          Slots available
        </FormLabel>
      </GridItem>

      <GridItem colStart={8} colEnd={12}>
        <Input
          id="slots"
          type="number"
          w="20%"
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
              message: `Cannot be more than ${MAX_PPL_ALLOWED}`,
            },
          })}
        />
      </GridItem>
      <GridItem colStart={12} colEnd={15} color="red.500" fontSize="xs">
        <ErrorMessage
          errors={props.errors}
          name="slots"
          render={({ message }) => <p>{message}</p>}
        />
      </GridItem>
    </Grid>
  );
}
