import React from 'react';
import Layout from '../components/Layout/MainNavBar/Layout';
import ListingDataForm from '../components/Listings/ListingDataForm';
import TitleBarContext from '../contexts/TitleBarContext';
import { useContext, useEffect } from 'react';

export default function ListingFormPage() {
  const TBarContext = useContext(TitleBarContext);
  useEffect(() => {
    TBarContext.toggleBackButton(true);
    TBarContext.changeTitle('Add a new listing');
  });
  return (
    <Layout>
      <ListingDataForm />
    </Layout>
  );
}
