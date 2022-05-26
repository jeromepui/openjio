import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export default function MinRequirementField({ errors, register }) {
  return (
    <FormControl isRequired>
      <FormLabel>Amount required to hit minimum spend</FormLabel>
      <InputGroup>
        <InputLeftAddon children="$" />
        <Input
          required={true}
          id="requiredSpend"
          type="number"
          {...register('requiredSpend', {
            required: {
              value: true,
              message: 'Please enter a number.',
            },
            validate: {
              positive: v => parseInt(v) > 0 || 'Should be greater than 0',
            },
          })}
        />
      </InputGroup>
      <ErrorMessage
        errors={errors}
        name="target"
        render={({ message }) => <Text color="red.500">{message}</Text>}
      />
    </FormControl>
  );
}
