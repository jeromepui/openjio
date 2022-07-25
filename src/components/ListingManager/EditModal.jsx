import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DescriptionField from '../ListingForm/ListingFormFields/DescriptionField';
import MinSpendField from '../ListingForm/ListingFormFields/RequiredSpendField';
import SlotsField from '../ListingForm/ListingFormFields/SlotsField';
import TitleField from '../ListingForm/ListingFormFields/TitleField';
import TypeField from '../ListingForm/ListingFormFields/TypeField';
import WebsiteField from '../ListingForm/ListingFormFields/WebsiteField';
import { updateListing } from '../../utils/ListingUtils';
import { updateParticipant } from '../../utils/ListingParticipantUtils';
import { updateRequest } from '../../utils/RequestUtils';

export default function EditModal({
  isOpen,
  listing,
  onClose,
  setShouldRefresh,
}) {
  const toast = useToast();
  const {
    description,
    listing_id,
    required_spend,
    slots,
    title,
    type,
    website,
  } = listing;
  const [listingType, setListingType] = useState(type);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: description,
      requiredSpend: required_spend,
      slots: slots,
      title: title,
      type: type,
      website: website,
    },
    mode: 'onTouched',
  });

  const onSubmit = async listingData => {
    let {
      description,
      requiredSpend,
      remaining_slots,
      slots,
      status,
      title,
      type,
      website,
    } = listingData;
    if (type === 'Bundle Deal') requiredSpend = '0';

    try {
      const listingUpdates = {
        title: title,
        website: website,
        type: type,
        required_spend: requiredSpend,
        slots: slots,
        description: description,
        status: status,
        remaining_slots: remaining_slots,
      };

      const { error: listingError } = await updateListing(
        listing_id,
        listingUpdates
      );
      if (listingError) throw listingError;

      const { error: participantError } = await updateParticipant(listing_id, {
        listing_title: title,
      });
      if (participantError) throw participantError;

      const { error: requestError } = await updateRequest(listing_id, {
        listing_title: title,
      });
      if (requestError) throw requestError;

      toast({
        description: 'Your listing has been updated!',
        duration: 4000,
        isClosable: true,
        status: 'success',
        title: 'Success!',
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setShouldRefresh(prev => !prev);
      onClose();
    }
  };

  return (
    <Modal
      blockScrollOnMount={true}
      closeOnOverlayClick={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit listing</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Stack>
              <TitleField errors={errors} register={register} />
              <WebsiteField errors={errors} register={register} />
              <TypeField
                errors={errors}
                register={register}
                setListingType={setListingType}
              />
              {listingType === 'Min. Spend' && (
                <MinSpendField errors={errors} register={register} />
              )}
              <SlotsField isDisabled errors={errors} register={register} />
              <DescriptionField register={register} />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              _hover={{
                background: '#06837F',
              }}
              bg="#02CECB"
              color="white"
              type="submit"
            >
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
