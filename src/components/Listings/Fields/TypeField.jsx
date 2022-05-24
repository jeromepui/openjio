import React from 'react';
import { FormLabel, Select, Grid, GridItem } from '@chakra-ui/react';

export default function TypeField(props) {
  function changeHandler(e) {
    props.setListingType(e.target.value);
    console.log(e.target.value);
  }

  return (
    <Grid templateColumns="repeat(10, 1fr)" width="100%">
      <GridItem colStart={3}>
        <FormLabel htmlFor="type" fontWeight="md" fontSize="md">
          Type of listing
        </FormLabel>
      </GridItem>

      <GridItem colStart={5} colEnd={10}>
        <Select
          id="type"
          w="30%"
          h="80%"
          onChange={() => console.log('a')}
          {...props.register('type', {
            required: {
              value: true,
              message: 'Please select an option.',
            },
          })}
        >
          <option value=""></option>
          <option value="bundleDeal">Bundle Deal</option>
          <option value="deliverySaver">Delivery Fee Saver</option>
          <option value="discount">Discount</option>
        </Select>
      </GridItem>
    </Grid>
  );
}
