import React from 'react';
import {
  FormLabel,
  Input,
  Grid,
  GridItem,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function DiscountField(props) {
  return (
    <Grid templateColumns="repeat(15, 1fr)" width="100%" alignItems="center">
      <GridItem colStart={5} colEnd={8}>
        <FormLabel htmlFor="discount" fontSize="md" fontWeight="md">
          Discount
        </FormLabel>
      </GridItem>
      <GridItem colStart={8} colEnd={12}>
        <InputGroup>
          <Input
            id="discount"
            type="number"
            w="25%"
            {...props.register('discount', {
              required: {
                value: true,
                message: 'Please enter a number.',
              },
              pattern: {
                value: /-?[0-9]{0,10}/,
                message: 'Only whole numbers accepted.',
              },
              validate: {
                positive: v => parseInt(v) > 0 || 'Should be greater than 0',
              },
            })}
          />
          <InputRightAddon children="%" />
        </InputGroup>
      </GridItem>
      <GridItem colStart={12} colEnd={15} color="red.500" fontSize="xs">
        <ErrorMessage
          errors={props.errors}
          name="discount"
          render={({ message }) => <p>{message}</p>}
          fontSize="1%"
        />
      </GridItem>
    </Grid>
  );
}
