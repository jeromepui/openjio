import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function TitleField({ errors, register }) {
  return (
    <FormControl isRequired>
      <FormLabel>Listing Title</FormLabel>
      <Input
        id="title"
        type="text"
        {...register('title', {
          required: {
            value: true,
            message: 'Please enter a title.',
          },
          maxLength: {
            value: 64,
            message: 'error message',
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="title"
        render={({ message }) => <Text color="red.500">{message}</Text>}
      />
    </FormControl>
  );
}
