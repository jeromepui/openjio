import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function SlotsField({ errors, register }) {
  const MAX_PPL_ALLOWED = 10;

  return (
    <FormControl isRequired>
      <FormLabel>Slots Available</FormLabel>
      <Input
        id="slots"
        type="number"
        {...register('slots', {
          required: {
            value: true,
            message: 'Please enter a number.',
          },
          min: {
            value: 0,
            message: 'Must be 0 and above',
          },
          max: {
            value: MAX_PPL_ALLOWED,
            message: `Cannot be more than ${MAX_PPL_ALLOWED}`,
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="slots"
        render={({ message }) => <Text color="red.500">{message}</Text>}
      />
    </FormControl>
  );
}
