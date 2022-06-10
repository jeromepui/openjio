import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../utils/UserUtils';
import TitleBar from '../components/TitleBar/TitleBar';
import UserInfo from '../components/Profile/UserInfo';
import {
  Flex,
  Tab,
  Tabs,
  TabPanel,
  TabList,
  TabPanels,
} from '@chakra-ui/react';
import UserReviews from '../components/Profile/UserReviews';
import UserListings from '../components/Profile/UserListings';

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
      <Flex direction="row" grow="1" mx="4">
        <UserInfo
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
              <UserReviews shouldRefresh={shouldRefresh} />
            </TabPanel>
            <TabPanel>
              <UserListings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}
