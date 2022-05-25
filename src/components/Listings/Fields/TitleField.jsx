import React from 'react';
import { FormLabel, Input, Grid, GridItem } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function TitleField(props) {
  const TITLE_LIMIT = 64;

  return (
    <Grid templateColumns="repeat(15, 1fr)" width="100%" alignItems="center">
      <GridItem colStart={5} colEnd={8}>
        <FormLabel htmlFor="title" fontSize="md" fontWeight="md">
          Title
        </FormLabel>
      </GridItem>
      <GridItem colStart={8} colEnd={12}>
        <Input
          id="title"
          type="text"
          w="90%"
          h="80%"
          {...props.register('title', {
            required: {
              value: true,
              message: 'Please enter a title.',
            },
            maxLength: {
              value: TITLE_LIMIT,
              message: 'error message',
            },
          })}
        />
      </GridItem>
      <GridItem colStart={12} colEnd={15} color="red.500" fontSize="xs">
        <ErrorMessage
          errors={props.errors}
          name="title"
          render={({ message }) => <p>{message}</p>}
        />
      </GridItem>
    </Grid>
  );
}
