import React from 'react';
import { FormLabel, Input, Grid, GridItem } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function ItemField(props) {
  return (
    <Grid templateColumns="repeat(15, 1fr)" width="100%" alignItems="center">
      <GridItem colStart={5} colEnd={8}>
        <FormLabel htmlFor="item" fontSize="md" fontWeight="md">Item on sale</FormLabel>
      </GridItem>
      <GridItem colStart={8} colEnd={12}>
        <Input
          id="item"
          type="text"
          w="90%" 
          {...props.register('item', {
            required: {
              value: true,
              message: 'Please enter name of promotional item.',
            },
          })}
        />
      </GridItem>
      <GridItem colStart={12} colEnd={15} color="red.500" fontSize="xs">
        <ErrorMessage
          errors={props.errors}
          name="item"
          render={({ message }) => <p>{message}</p>}
        />
      </GridItem>
    </Grid>
  );
}
