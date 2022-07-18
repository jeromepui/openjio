import React from 'react';
import {
  Stack,
  Heading,
  Text,
  Image,
  Icon,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import { SmallCloseIcon } from '@chakra-ui/icons';

export default function ProfileCustomize() {
  return (
    <Stack alignContent="flex-start" mt="1%" maxW="75vw">
      <Heading size="xl">Customize own profile</Heading>
      <Text fontSize="xl">
        To customize your profile, access the control center by clicking on{' '}
        <Icon as={MdSettings} ml="8px" mr="8px" /> and select <i>Settings</i>. At the
        moment, OpenJio only allows its users to upload an avatar. <br /> <br />
        <Image
          src="../../../edit-profile.jpg"
          alt="Profile customization page"
        />
        To upload an avatar, click on <i>Choose File</i> on the photo chooser to browse
        for a picture. <br /> <br />
        <Image
          src="../../../choose-photo.jpg"
          alt="Photo selector under Settings for profile customization"
        />
        <br /> <br />
        A window will pop up. Select a picture and select <i>Open</i>. <br /> <br />
        <Image
          src="../../../photo-selector.jpg"
          alt="Photo selector window to browse pictures"
        />
        <br /> <br />
        The photo will be loaded on the photo chooser. <br /> <br />
        <Image
          src="../../../picture-loaded.jpg"
          alt="Photo selector with the filename of the photo displayed"
        />
        <br /> <br />
        For the change to be effected, click on{' '}
        <Button
          bg="#02CECB"
          color="white"
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="1%"
          mr="1%"
          size="sm"
          w="20%"

        >
          Upload photo
        </Button>
        . You will see your latest avatar in the profile photo circle. <br />{' '}
        <br />
        <Image
          src="../../../profile-photo-circle.jpg"
          alt="Profile photo circle"
        />
        <br /> <br />
        To remove your avatar, click on the red cross sign{' '}
        <IconButton
          colorScheme="red"
          icon={<SmallCloseIcon />}
          rounded="full"
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="0.5%"
          mr="0.5%"
          size="xs"
        />
        on the profile photo circle.
      </Text>
    </Stack>
  );
}
