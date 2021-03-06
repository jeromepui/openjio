import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function WebsiteField({ errors, register }) {
  return (
    <FormControl isRequired>
      <FormLabel>Website</FormLabel>
      <Input
        id="website"
        type="url"
        {...register('website', {
          required: {
            message: 'Please provide a URL to the deal.',
            value: true,
          },
          pattern: {
            value:
              /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
            message: 'Please enter a valid URL.',
          },
        })}
      />

      <ErrorMessage
        errors={errors}
        name="website"
        render={({ message }) => <Text color="red.400">{message}</Text>}
      />
    </FormControl>
  );
}
