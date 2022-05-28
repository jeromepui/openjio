import { Box, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Listings from '../components/Listings/Listings';
import TitleBar from '../components/TitleBar/TitleBar';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';

export default function HomePage() {
  const auth = useAuth();

  useEffect(() => {
    getProfile();
  }, [auth.session]);

  const getProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', auth.user.id);

    if (error) console.log(error);

    if (data.length < 1) {
      const insertUsername = {
        id: auth.user.id,
        updated_at: new Date(),
        username: auth.user.email,
      };

      const { error } = await supabase.from('profiles').insert(insertUsername);

      if (error) console.log(error);
    }
  };

  return (
    <>
      <TitleBar backButton={false} text="Welcome to OpenJio"></TitleBar>
      <Box my="2" px="6">
        <Link to="/add-listing">
          <Button colorScheme="teal" leftIcon={<MdAdd />}>
            Add Listing
          </Button>
        </Link>
      </Box>
      <Listings />
    </>
  );
}
