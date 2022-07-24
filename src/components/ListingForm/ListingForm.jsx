import { Box, Button, GridItem, SimpleGrid, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DescriptionField from './ListingFormFields/DescriptionField';
import MinSpendField from './ListingFormFields/RequiredSpendField';
import SlotsField from './ListingFormFields/SlotsField';
import TitleField from './ListingFormFields/TitleField';
import TypeField from './ListingFormFields/TypeField';
import WebsiteField from './ListingFormFields/WebsiteField';
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
      let { description, requiredSpend, slots, title, type, website } =
        listingData;

      if (type === 'Bundle Deal') requiredSpend = '0';

      const listing = {
        description: description,
        listing_id: listingId,
        remaining_slots: slots,
        required_spend: requiredSpend,
        slots: slots,
        status: 'open',
        title: title,
        type: type,
        website: website,
      };

      const { error: listingError } = await addListing(listing);
      if (listingError) throw listingError;

      const listingParticipantsId = uuidv4();

      const { data: userData, error: userError } = await getUserProfile(
        auth.user.id
      );
      if (userError) throw userError;

      const participant = {
        is_owner: true,
        listing_id: listingId,
        listing_participants_id: listingParticipantsId,
        listing_title: title,
        participant_id: auth.user.id,
        participant_username: userData.username,
      };

      const { error: participantError } = await addParticipant(participant);
      if (participantError) throw participantError;
    } catch (error) {
      alert(error.message);
    } finally {
      toast({
        title: 'Success!',
        description: 'Your new listing has been added! A group chat has been created for you as well!',
        duration: 4000,
        isClosable: true,
        status: 'success',
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
