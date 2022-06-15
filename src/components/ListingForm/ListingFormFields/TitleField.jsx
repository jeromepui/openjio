import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function TitleField({ errors, register, value }) {
  return (
    <FormControl isRequired>
      <FormLabel>Listing Title</FormLabel>
      <Input
        id="title"
        type="text"
        value={value}
        {...register('title', {
          required: {
            message: 'Please enter a title.',
            value: true,
          },
          maxLength: {
            message: 'Title is too long',
            value: 64,
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="title"
        render={({ message }) => <Text color="red.400">{message}</Text>}
      />
    </FormControl>
  );
}
