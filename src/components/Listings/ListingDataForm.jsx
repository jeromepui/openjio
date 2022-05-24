import React from 'react';
import { useForm } from 'react-hook-form';
import exports from './Fields/fieldsIndex';
import { FormErrorMessage, Button, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function ListingDataForm() {
  const [listingType, setListingType] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = data => console.log(data);

  const formAlterer = () => {
    switch (listingType) {
      case 'deliverySaver':
        <>
          <exports.MinRequirementField register={register} />
          <FormErrorMessage>{errors.minreq?.message}</FormErrorMessage>
        </>;
        break;

      case 'bundleDeal':
        <>
          <exports.ItemField register={register} />
          <FormErrorMessage>{errors.item?.message}</FormErrorMessage>
        </>;
        break;
      case 'discount':
        <>
          <exports.MinRequirementField register={register} />
          <FormErrorMessage>{errors.minreq?.message}</FormErrorMessage>
          <exports.DiscountField register={register} />
          <FormErrorMessage>{errors.currentSpend?.message}</FormErrorMessage>
        </>;
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <VStack spacing="1%">
  
          <exports.TitleField register={register} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>{' '}
    
          <exports.WebsiteField register={register} />
          <FormErrorMessage>{errors.website?.message}</FormErrorMessage>{' '}


          <exports.SlotsField register={register} />
          <FormErrorMessage>{errors.slots?.message}</FormErrorMessage>
    
          <exports.TypeField
            register={register}
            setListingType={setListingType}
          />
          <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
    
          <exports.DescriptionField register={register} />
          <FormErrorMessage>{errors.desc?.message}</FormErrorMessage>{' '}
          
          <Button type="submit">Submit</Button>{' '}
  
      </VStack>

    </form>
  );
}
