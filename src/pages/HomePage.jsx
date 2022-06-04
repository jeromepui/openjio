import { Box, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import HomeListings from '../components/Listings/HomeListings';
import TitleBar from '../components/TitleBar/TitleBar';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import { getUserProfile } from '../utils/UserUtils';

export default function HomePage() {
  const auth = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { userData, error } = await getUserProfile(auth.user.id);
        if (error) throw error;

        if (userData.length < 1) {
          const insertUsername = {
            id: auth.user.id,
            username: auth.user.email,
            updated_at: new Date(),
          };

          const { error } = await supabase
            .from('profiles')
            .insert(insertUsername);

          if (error) throw error;
        }
      } catch (error) {}
    };
    getProfile();
  }, [auth.user.email, auth.user.id]);

  return (
    <>
      <TitleBar backButton={false} text="Welcome to OpenJio"></TitleBar>
      <Box my="2" px="6">
        <Link to="/add-listing">
          <Button
            bg="#02CECB"
            color="white"
            _hover={{
              background: '#06837F',
            }}
            leftIcon={<MdAdd />}
          >
            Add Listing
          </Button>
        </Link>
      </Box>
      <HomeListings />
    </>
  );
}
