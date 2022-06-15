import {
  Flex,
  Tab,
  Tabs,
  TabPanel,
  TabList,
  TabPanels,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitleBar from '../components/TitleBar/TitleBar';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileReviews from '../components/Profile/ProfileReviews/ProfileReviews';
import ProfileListings from '../components/Profile/ProfileListings';
import { getUserProfile } from '../utils/UserUtils';

export default function ProfilePage() {
  const { id: profileId } = useParams();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await getUserProfile(profileId);
        if (error) throw error;

        setAvatarUrl(data.avatar_url);
        setUsername(data.username);
      } catch (error) {
        alert(error.message);
      }
    };
    getProfile();
  }, [profileId]);

  return (
    <>
      <TitleBar backButton={true} text="Profile" />
      <Flex direction={{ sm: 'column', md: 'row' }} mx="4">
        <ProfileInfo
          avatarUrl={avatarUrl}
          setShouldRefresh={setShouldRefresh}
          shouldRefresh={shouldRefresh}
          username={username}
        />
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Reviews</Tab>
            <Tab>Listings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProfileReviews shouldRefresh={shouldRefresh} />
            </TabPanel>
            <TabPanel>
              <ProfileListings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}
