import React from 'react';
import { useForm } from 'react-hook-form';
import exports from './Fields/fieldsIndex';
import { useToast, Button, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListingDataForm() {
  const makeToast = useToast();
  const [listingType, setListingType] = useState('');
  const navigate = useNavigate();

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

  const onSubmit = data => {
    console.log(data);
    makeToast({
      title: 'Listing added',
      description: 'Your new listing is added.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    navigate("/dashboard", {replace: true})

  };

  function renderSwitch(param) {
    switch (param) {
      case 'deliverySaver':
        return (
          <exports.MinRequirementField register={register} errors={errors} />
        );

      case 'bundleDeal':
        return <exports.ItemField register={register} errors={errors} />;

      case 'discount':
        return (
          <>
            <exports.MinRequirementField register={register} errors={errors} />
            <exports.DiscountField register={register} errors={errors} />
          </>
        );

      default:
        break;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="1%">
        <exports.TitleField register={register} errors={errors} />
        <exports.WebsiteField register={register} errors={errors} />
        <exports.SlotsField register={register} errors={errors} />
        <exports.TypeField
          register={register}
          errors={errors}
          setListingType={setListingType}
          listingType={listingType}
        />
        <exports.DescriptionField register={register} />
        {renderSwitch(listingType)}
        <Button type="submit">Submit</Button>{' '}
      </VStack>
    </form>
  );
}
