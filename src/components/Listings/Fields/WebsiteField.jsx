import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
} from '@chakra-ui/react';

export default function WebsiteField(props) {
  return (
    <Grid templateColumns="repeat(10, 1fr)" width="100%">
      <GridItem colStart={3}>
        <FormLabel htmlFor="website" fontWeight="md">Website</FormLabel>
      </GridItem>

      <GridItem colStart={5} colEnd={10}>
        <Input
          id="website"
          type="url"
          w="70%"
          h="80%"
          {...props.register('website', {
            required: {
              value: true,
              message: 'Please enter a link.',
            },
            validate: {
              checkUrl: async () => (await fetch()) || 'URL is not valid',
            },
          })}
        />
      </GridItem>
    </Grid>
  );
}
