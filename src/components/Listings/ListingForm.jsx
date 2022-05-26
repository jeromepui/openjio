import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../supabase';
import DescriptionField from './Fields/DescriptionField';
import MinSpendField from './Fields/MinSpendField';
import SlotsField from './Fields/SlotsField';
import TitleField from './Fields/TitleField';
import TypeField from './Fields/TypeField';
import WebsiteField from './Fields/WebsiteField';

export default function ListingDataForm() {
  const navigate = useNavigate();
  const makeToast = useToast();

  const [listingType, setListingType] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      website: 'https://',
    },
  });

  const onSubmit = async listingData => {
    try {
      const user = supabase.auth.user();

      let { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      const listingId = uuidv4();

      const listing = {
        id: listingId,
        title: listingData.title,
        website: listingData.website,
        type: listingData.type,
        required_spend: listingData.requiredSpend,
        slots: listingData.slots,
        description: listingData.description,
        created_by: user.id,
        created_by_username: data.username,
      };

      let { error } = await supabase.from('listings').insert(listing);

      if (error) throw error;

      makeToast({
        title: 'Success!',
        description: 'Your new listing has been added.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box m="5" p="5" w={['auto', '50%']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TitleField register={register} errors={errors} />
          <WebsiteField register={register} errors={errors} />
          <TypeField
            register={register}
            errors={errors}
            setListingType={setListingType}
            listingType={listingType}
          />
          {listingType === 'Min. Spend' && (
            <MinSpendField register={register} errors={errors} />
          )}
          <SlotsField register={register} errors={errors} />
          <DescriptionField register={register} />
          <Button
            bg="#0FA3B1"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
            type="submit"
            width={['auto', '20%']}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
