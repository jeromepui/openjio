import { FormControl, FormLabel, Select } from '@chakra-ui/react';

export default function TypeField({ register, setListingType }) {
  return (
    <FormControl isRequired>
      <FormLabel>Type</FormLabel>
      <Select
        isRequired
        id="type"
        {...register('type', {
          validate: {
            required: v => !(v = '') || 'Please select an option.',
          },
          onChange: e => {
            setListingType(e.target.value);
          },
        })}
        placeholder="Select option"
      >
        <option value="Bundle Deal">Bundle Deal</option>
        <option value="Min. Spend">Minimum Spend</option>
      </Select>
    </FormControl>
  );
}
