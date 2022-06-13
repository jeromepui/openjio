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
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile } from '../../utils/UserUtils';
import { addListing } from '../../utils/ListingUtils';
import { addParticipant } from '../../utils/ListingParticipantUtils';

export default function ListingForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
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
      const listingId = uuidv4();
      let { title, website, type, requiredSpend, slots, description } =
        listingData;

      if (type === 'Bundle Deal') requiredSpend = '0';

      const listing = {
        listing_id: listingId,
        title: title,
        website: website,
        type: type,
        required_spend: requiredSpend,
        slots: slots,
        remaining_slots: slots,
        status: 'open',
        description: description,
      };

      const { error: listingError } = await addListing(listing);
      if (listingError) throw listingError;

      const listingParticipantsId = uuidv4();

      const { data: userData, error: userError } = await getUserProfile(
        auth.user.id
      );
      if (userError) throw userError;

      const participant = {
        listing_participants_id: listingParticipantsId,
        listing_id: listingId,
        participant_id: auth.user.id,
        listing_title: title,
        participant_username: userData.username,
        is_owner: true,
      };

      const { error: participantError } = await addParticipant(participant);
      if (participantError) throw participantError;
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
    <Box px="6" py="4" w={{ sm: '100%', md: '50%' }}>
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
          <Button type="submit" maxW="200px">
            Submit
          </Button>
        </SimpleGrid>
      </form>
    </Box>
  );
}
