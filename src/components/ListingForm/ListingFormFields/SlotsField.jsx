import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function SlotsField({ errors, isDisabled, register }) {
  return (
    <FormControl isRequired isDisabled={isDisabled}>
      <FormLabel>Slots Available</FormLabel>
      <Input
        id="slots"
        type="number"
        {...register('slots', {
          required: {
            message: 'Please enter a number (maximum 10).',
            value: true,
          },
          min: { message: 'Must be more than 0', value: 0 },
          max: {
            message: `Cannot be more than 10.`,
            value: 10,
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
