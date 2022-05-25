import React from 'react';
import { FormLabel, Input, Grid, GridItem } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function WebsiteField(props) {
  return (
    <Grid templateColumns="repeat(15, 1fr)" width="100%" alignItems="center">
      <GridItem colStart={5} colEnd={8}>
        <FormLabel htmlFor="website" fontWeight="md">
          Website
        </FormLabel>
      </GridItem>

      <GridItem colStart={8} colEnd={12}>
        <Input
          id="website"
          type="url"
          w="90%"
          h="80%"
          {...props.register('website', {
            required: {
              value: true,
              message: 'Please enter a link.',
            },
            pattern: {
              value:
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
              message: 'Please enter a valid url.',
            },
          })}
        />
      </GridItem>
      <GridItem colStart={12} colEnd={15} color="red.500" fontSize="xs">
        <ErrorMessage
          errors={props.errors}
          name="website"
          render={({ message }) => <p>{message}</p>}
        />
      </GridItem>
    </Grid>
  );
}
