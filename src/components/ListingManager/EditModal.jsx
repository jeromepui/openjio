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
import DescriptionField from '../ListingForm/DescriptionField';
import MinSpendField from '../ListingForm/RequiredSpendField';
import SlotsField from '../ListingForm/SlotsField';
import TitleField from '../ListingForm/TitleField';
import TypeField from '../ListingForm/TypeField';
import WebsiteField from '../ListingForm/WebsiteField';
import { updateListing } from '../../utils/ListingUtils';

export default function EditModal({
  isOpen,
  listing,
  onClose,
  setShouldRefresh,
}) {
  const toast = useToast();
  const { listing_id, type } = listing;
  const [listingType, setListingType] = useState(type);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: listing.description,
      website: listing.website,
      requiredSpend: listing.required_spend,
      slots: listing.slots,
      title: listing.title,
      type: listing.type,
    },
    mode: 'onTouched',
  });

  const onSubmit = async listingData => {
    let {
      title,
      website,
      type,
      requiredSpend,
      slots,
      description,
      status,
      remaining_slots,
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

      const { error } = await updateListing(listing_id, listingUpdates);
      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Your listing has been updated!',
        status: 'success',
        duration: 4000,
        isClosable: true,
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
              <SlotsField
                errors={errors}
                register={register}
                isDisabled={true}
              />
              <DescriptionField register={register} />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#02CECB"
              color="white"
              _hover={{
                background: '#06837F',
              }}
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
