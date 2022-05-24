import React from 'react';
import {
  FormLabel,
  Textarea,
  Grid,
  GridItem,
} from '@chakra-ui/react';

export default function DescriptionField(props) {
  return (
    <Grid templateColumns="repeat(10, 1fr)" width="100%">
      <GridItem colStart={3}>
        <FormLabel htmlFor="desc" fontSize="md" fontWeight="md">
          Description
        </FormLabel>
      </GridItem>

      <GridItem colStart={5} colEnd={10}>
        <Textarea id="desc" w="60%" h="80%" {...props.register('desc')} />
      </GridItem>
    </Grid>
  );
}
