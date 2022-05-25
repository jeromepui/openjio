import React from 'react';
import { FormLabel, Select, Grid, GridItem, Button } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function TypeField(props) {
  return (
    <Grid templateColumns="repeat(15, 1fr)" width="100%" alignItems="center">
      <GridItem colStart={5} colEnd={8}>
        <FormLabel htmlFor="type" fontWeight="md" fontSize="md">
          Type of listing
        </FormLabel>
      </GridItem>

      <GridItem colStart={8} colEnd={12}>
        <select
          required={true}
          defaultValue=""
          id="type"
          w="30%"
          h="80%"
          fontSize="sm"
          {...props.register('type', {
            validate: {
              required: v => !(v = '') || 'Please select an option.',
            },
            onChange: e => {
              props.setListingType(e.target.value);
              console.log(props.listingType);
            },
          })}
        >
          <option disabled value="">
            --Select one--
          </option>
          <option value="bundleDeal">Bundle Deal</option>
          <option value="deliverySaver">Delivery Fee Saver</option>
          <option value="discount">Discount</option>
        </select>
      </GridItem>
      <GridItem colStart={12} colEnd={15} color="red.500" fontSize="xs">
        <ErrorMessage
          errors={props.errors}
          name="type"
          render={({ message }) => <p>{message}</p>}
        />
      </GridItem>
    </Grid>
  );
}
