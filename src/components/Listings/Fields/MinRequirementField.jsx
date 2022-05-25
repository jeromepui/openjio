import React from 'react';
import {
  Box,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';

export default function MinRequirementField(props) {
  const [currentSpend, setCurrentSpend] = useState(0);

  return (
    <Grid templateColumns="repeat(15, 1fr)" width="100%" alignItems="center">
      <GridItem colStart={5} colEnd={8}>
        <FormLabel htmlFor="currentSpend" fontSize="md" fontWeight="md">
          Progress to reach min. spend{' '}
        </FormLabel>
      </GridItem>
      <GridItem colStart={8} colEnd={10}>
        <InputGroup>
          <InputLeftAddon children="$" />

          <Input
            required={true}
            id="currentSpend"
            type="number"
            w="45%"
            {...props.register('currentSpend', {
              required: {
                value: true,
                message: 'Please enter a number.',
              },
              validate: {
                positive: v => parseInt(v) > 0 || 'Should be greater than 0',
              },
              onChange: e => setCurrentSpend(e.target.value),
            })}
          />
        </InputGroup>
      </GridItem>
      <GridItem colStart={10}>
        <Box display="inline"> out of </Box>
      </GridItem>
      <GridItem colStart={11} colEnd={12}>
        <Input
          id="target"
          type="number"
          w="90%"
          {...props.register('target', {
            required: {
              value: true,
            },
            validate: {
              positive: v =>
                parseInt(v) > currentSpend ||
                'Current progress should be greater than target.',
            },
          })}
        />
      </GridItem>
      <GridItem colStart={12} colEnd={15} color="red.500" fontSize="xs">
        <ErrorMessage
          errors={props.errors}
          name="target"
          render={({ message }) => <p>{message}</p>}
        />
      </GridItem>
    </Grid>
  );
}
