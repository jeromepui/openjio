import React from 'react';
import { FormLabel, Textarea, Grid, GridItem } from '@chakra-ui/react';

export default function DescriptionField(props) {
  return (
    <Grid templateColumns="repeat(15, 1fr)" width="100%" alignItems="center">
      <GridItem colStart={5} colEnd={8}>
        <FormLabel htmlFor="desc" fontSize="md" fontWeight="md">
          Description
        </FormLabel>
      </GridItem>

      <GridItem colStart={8} colEnd={12}>
        <Textarea id="desc" w="90%" h="80%" {...props.register('desc')} />
      </GridItem>
    </Grid>
  );
}
