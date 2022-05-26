import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';

export default function DescriptionField({ register }) {
  return (
    <FormControl>
      <FormLabel>Description</FormLabel>
      <Textarea id="description" {...register('description')} />
    </FormControl>
  );
}
