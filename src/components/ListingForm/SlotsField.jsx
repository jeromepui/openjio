import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function SlotsField({ errors, register }) {
  return (
    <FormControl isRequired>
      <FormLabel>Slots Available</FormLabel>
      <Input
        id="slots"
        type="number"
        {...register('slots', {
          required: {
            value: true,
            message: 'Please enter a number (maximum 10).',
          },
          min: {
            value: 0,
            message: 'Must be more than 0',
          },
          max: {
            value: 10,
            message: `Cannot be more than 10.`,
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
