import React from 'react';
import {
  Link,
  Text,
  Stack,
} from '@chakra-ui/react';

export default function HelpMenu( { setContent } ) {
  return (
    <Stack justifyContent="flex-start" m="6px" h="85vh" maxW='25vw'>
      <Text fontSize="sm" fontWeight="extrabold">
        OVERVIEW
      </Text>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("overview-intro")}>
        <Text ml="10px">Introduction</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("overview-listings")}>
        <Text ml="10px">Listings and shopping groups</Text>
      </Link>
      <Text fontSize="sm" fontWeight="extrabold">
        LISTINGS
      </Text>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("listings-home")}>
        <Text ml="10px">Home</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("listings-dashboard")}>
        <Text ml="10px">Dashboard</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("listings-search")}>
        <Text ml="10px">Search listings</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("listings-create")}>
        <Text ml="10px">Create new listings</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("listings-change-status")}>
        <Text ml="10px">Change listing status</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("listings-edit-info")}>
        <Text ml="10px">Edit listing information</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("listings-delete")}>
        <Text ml="10px">Delete listing</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("listings-join")}>
        <Text ml="10px">Join a listing</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent("listings-leave")}>
        <Text ml="10px">Leave a listing</Text>
      </Link>
      <Text fontSize="sm" fontWeight="extrabold">
        SHOPPING GROUP
      </Text>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent('sg-requests')}>
        <Text ml="10px">Manage join listing requests</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent('sg-participants')}>
        <Text ml="10px">Manage participants</Text>
      </Link>
      <Text fontSize="sm" fontWeight="extrabold">
        CHAT
      </Text>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent('chat')}>
        <Text ml="10px">Chat with shopping group</Text>
      </Link>
      <Text fontSize="sm" fontWeight="extrabold">
        PROFILE
      </Text>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent('profile-view-own')}>
        <Text ml="10px">View own profile</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent('profile-customize')}>
        <Text ml="10px">Customize own profile</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent('profile-view-others')}>
        <Text ml="10px">View others' profile</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent('profile-reviews')}>
        <Text ml="10px">Rate and review</Text>
      </Link>
      <Link _hover={{ bg: '#C5FFFF' }} onClick={() => setContent('profile-edit-reviews')}>
        <Text ml="10px">Edit or remove reviews</Text>
      </Link>
    </Stack>
  );
}