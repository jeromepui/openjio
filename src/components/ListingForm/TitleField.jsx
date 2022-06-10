import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function TitleField({ errors, register, value}) {
  return (
    <FormControl isRequired>
      <FormLabel>Listing Title</FormLabel>
      <Input
        id="title"
        type="text"
        value={value}
        {...register('title', {
          required: {
            value: true,
            message: 'Please enter a title.',
          },
          maxLength: {
            value: 64,
            message: 'Title is too long',
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
