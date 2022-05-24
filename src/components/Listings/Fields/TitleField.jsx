import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
} from '@chakra-ui/react';

export default function TitleField(props) {
  const TITLE_LIMIT = 64;

  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      width="100%"
    >
      <GridItem colStart={3}>
        <FormLabel htmlFor="title" fontSize="md" fontWeight="md">Title</FormLabel>
      </GridItem>
      <GridItem colStart={5} colEnd={10}>
        <Input
          id="title"
          type="text"
          w="70%"
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
    </Grid>
  );
}
