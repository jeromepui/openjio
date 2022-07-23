import { React } from 'react';
import { Stack } from '@chakra-ui/react';
import Chat from './HelpPages/Chat';
import ListingsChangeStatus from './HelpPages/ListingsChangeStatus';
import ListingsCreate from './HelpPages/ListingsCreate';
import ListingsDashboard from './HelpPages/ListingsDashboard';
import ListingsDelete from './HelpPages/ListingsDelete';
import ListingsEditInfo from './HelpPages/ListingsEditInfo';
import ListingsHome from './HelpPages/ListingsHome';
import ListingsJoin from './HelpPages/ListingsJoin';
import ListingsLeave from './HelpPages/ListingsLeave';
import ListingsSearch from './HelpPages/ListingsSearch';
import OverviewIntro from './HelpPages/OverviewIntro';
import OverviewListings from './HelpPages/OverviewListings';
import ProfileCustomize from './HelpPages/ProfileCustomize';
import ProfileEditReviews from './HelpPages/ProfileEditReviews';
import ProfileReviews from './HelpPages/ProfileReviews';
import ProfileViewOthers from './HelpPages/ProfileViewOthers';
import ProfileViewOwn from './HelpPages/ProfileViewOwn';
import SgParticipants from './HelpPages/SgParticipants';
import SgRequests from './HelpPages/SgRequests';

export default function HelpContent({ content }) {
  function renderContent() {
    switch (content) {
      case 'overview-intro':
        return <OverviewIntro />;

      case 'overview-listings':
        return <OverviewListings />;

      case 'listings-home':
        return <ListingsHome />;

      case 'listings-dashboard':
        return <ListingsDashboard />;

      case 'listings-search':
        return <ListingsSearch />;

      case 'listings-create':
        return <ListingsCreate />;

      case 'listings-change-status':
        return <ListingsChangeStatus />;

      case 'listings-edit-info':
        return <ListingsEditInfo />;

      case 'listings-delete':
        return <ListingsDelete />;

      case 'listings-join':
        return <ListingsJoin />;

      case 'listings-leave':
        return <ListingsLeave />;

      case 'sg-requests':
        return <SgRequests />;

      case 'sg-participants':
        return <SgParticipants />;

      case 'chat':
        return <Chat />;

      case 'profile-view-own':
        return <ProfileViewOwn />;

      case 'profile-view-others':
        return <ProfileViewOthers />;

      case 'profile-customize':
        return <ProfileCustomize />;

      case 'profile-reviews':
        return <ProfileReviews />;

      case 'profile-edit-reviews':
        return <ProfileEditReviews />;

      default:
        return;
    }
  }
  return (
    <Stack
      alignContent="flex-start"
      mt="1%"
      maxW={{ sm: '90vw', md: '75vw' }}
      pb="10%"
    >
      {renderContent()}
    </Stack>
  );
}
