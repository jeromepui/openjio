import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function WebsiteField({ errors, register }) {
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="website">Website</FormLabel>
      <Input
        id="website"
        type="url"
        {...register('website', {
          required: {
            value: true,
            message: 'Please enter a link.',
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
        render={({ message }) => <Text color="red.500">{message}</Text>}
      />
    </FormControl>
  );
}
