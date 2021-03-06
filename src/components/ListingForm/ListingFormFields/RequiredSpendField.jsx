import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function RequiredSpendField({ errors, register }) {
  return (
    <FormControl isRequired>
      <FormLabel>$ Required for Free Delivery</FormLabel>
      <InputGroup>
        <InputLeftAddon children="$" />
        <Input
          id="requiredSpend"
          type="number"
          {...register('requiredSpend', {
            required: {
              message: 'Please enter a number.',
              value: true,
            },
            validate: {
              positive: v => parseInt(v) > 0 || 'Should be greater than 0',
            },
          })}
        />
      </InputGroup>
      <ErrorMessage
        errors={errors}
        name="requiredSpend"
        render={({ message }) => <Text color="red.400">{message}</Text>}
      />
    </FormControl>
  );
}
