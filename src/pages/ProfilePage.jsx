import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../utils/UserUtils';
import TitleBar from '../components/TitleBar/TitleBar';
import UserInfo from '../components/Profile/UserInfo';
import {
  HStack,
  Tabs,
  TabPanel,
  TabList,
  TabPanels,
  Tab,
} from '@chakra-ui/react';
import UserReviews from '../components/Profile/UserReviews';
import UserListings from '../components/Profile/UserListings';

export default function ProfilePage() {
  const { id: profileId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await getUserProfile(profileId);
        if (error) throw error;

        setProfile(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getProfile();
  }, [profileId]);

  return (
    <>
      <TitleBar backButton={true} text="Profile" />
      <HStack align="flex-start">
        <UserInfo profile={profile} />
        <Tabs w="70%">
          <TabList>
            <Tab>Reviews</Tab>
            <Tab>Listings</Tab>
          </TabList>

          <TabPanels marginLeft={{base: "-1.5rem"}}>
            <TabPanel>
              <UserReviews />
            </TabPanel>
            <TabPanel>
              <UserListings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </>
  );
}
