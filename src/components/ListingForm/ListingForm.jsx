import { Box, Button, GridItem, SimpleGrid, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DescriptionField from './DescriptionField';
import MinSpendField from './RequiredSpendField';
import SlotsField from './SlotsField';
import TitleField from './TitleField';
import TypeField from './TypeField';
import WebsiteField from './WebsiteField';
import { supabase } from '../../supabase';

export default function ListingForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const [listingType, setListingType] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      requiredSpend: 1,
      website: 'https://',
    },
    mode: 'onTouched',
  });

  const onSubmit = async listingData => {
    try {
      const user = supabase.auth.user();
      const listingId = uuidv4();

      if (listingData.type === 'Bundle Deal') listingData.requiredSpend = '0';

      const listing = {
        listing_id: listingId,
        created_by: user.id,
        description: listingData.description,
        required_spend: listingData.requiredSpend,
        slots: listingData.slots,
        status: 'open',
        title: listingData.title,
        type: listingData.type,
        website: listingData.website,
      };

      const { error } = await supabase.from('listings').insert(listing);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      toast({
        title: 'Success!',
        description: 'Your new listing has been added!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate('/dashboard');
    }
  };

  return (
    <Box p="6" w={{ base: 'auto', md: '50%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns="2" spacing="4">
          <GridItem colSpan="2">
            <TitleField register={register} errors={errors} />
          </GridItem>
          <GridItem colSpan="2">
            <WebsiteField register={register} errors={errors} />
          </GridItem>
          <GridItem colSpan={{ base: '2', md: '1' }}>
            <TypeField
              register={register}
              errors={errors}
              setListingType={setListingType}
            />
          </GridItem>
          <GridItem colSpan={{ base: '2', md: '1' }}>
            {listingType === 'Min. Spend' && (
              <MinSpendField register={register} errors={errors} />
            )}
          </GridItem>
          <GridItem colSpan="1">
            <SlotsField register={register} errors={errors} />
          </GridItem>
          <GridItem colSpan="2">
            <DescriptionField register={register} />
          </GridItem>
          <Button
            bg="#02CECB"
            color="white"
            _hover={{
              background: '#06837F',
            }}
            type="submit"
            maxW="200px"
          >
            Submit
          </Button>
        </SimpleGrid>
      </form>
    </Box>
  );
}
