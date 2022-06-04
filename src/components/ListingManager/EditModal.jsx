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
import { supabase } from '../../supabase';
import DescriptionField from '../ListingForm/DescriptionField';
import MinSpendField from '../ListingForm/RequiredSpendField';
import SlotsField from '../ListingForm/SlotsField';
import TitleField from '../ListingForm/TitleField';
import TypeField from '../ListingForm/TypeField';
import WebsiteField from '../ListingForm/WebsiteField';

export default function EditModal({ isOpen, listing, onClose }) {
  const makeToast = useToast();
  const [listingType, setListingType] = useState(listing.type);

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
    try {
      const listingUpdates = {
        listing_id: listing.listing_id,
        title: listingData.title,
        website: listingData.website,
        type: listingData.type,
        required_spend: listingData.requiredSpend,
        slots: listingData.slots,
        description: listingData.description,
        status: listing.status,
      };

      const { error } = await supabase.from('listings').upsert(listingUpdates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) throw error;

      makeToast({
        title: 'Success!',
        description: 'Your listing has been updated.',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      window.location.reload(false);
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
              <SlotsField errors={errors} register={register} />
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
