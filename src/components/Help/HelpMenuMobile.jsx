import React from 'react';
import {
  Link,
  Text,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

export default function HelpMenuMobile({
  setContent,
  isOpen,
  onClose,
  btnRef,
}) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <Stack justifyContent="flex-start">
            <Text fontSize="sm" fontWeight="extrabold">
              OVERVIEW
            </Text>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('overview-intro');
                onClose();
              }}
            >
              <Text ml="10px">Introduction</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('overview-listings');
                onClose();
              }}
            >
              <Text ml="10px">Listings and shopping groups</Text>
            </Link>
            <Text fontSize="sm" fontWeight="extrabold">
              LISTINGS
            </Text>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('listings-home');
                onClose();
              }}
            >
              <Text ml="10px">Home</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('listings-dashboard');
                onClose();
              }}
            >
              <Text ml="10px">Dashboard</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('listings-search');
                onClose();
              }}
            >
              <Text ml="10px">Search listings</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('listings-create');
                onClose();
              }}
            >
              <Text ml="10px">Create new listings</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('listings-change-status');
                onClose();
              }}
            >
              <Text ml="10px">Change listing status</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('listings-edit-info');
                onClose();
              }}
            >
              <Text ml="10px">Edit listing information</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('listings-delete');
                onClose();
              }}
            >
              <Text ml="10px">Delete listing</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('listings-join');
                onClose();
              }}
            >
              <Text ml="10px">Join a listing</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('listings-leave');
                onClose();
              }}
            >
              <Text ml="10px">Leave a listing</Text>
            </Link>
            <Text fontSize="sm" fontWeight="extrabold">
              SHOPPING GROUP
            </Text>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('sg-requests');
                onClose();
              }}
            >
              <Text ml="10px">Manage join listing requests</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('sg-participants');
                onClose();
              }}
            >
              <Text ml="10px">Manage participants</Text>
            </Link>
            <Text fontSize="sm" fontWeight="extrabold">
              CHAT
            </Text>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('chat');
                onClose();
              }}
            >
              <Text ml="10px">Chat with shopping group</Text>
            </Link>
            <Text fontSize="sm" fontWeight="extrabold">
              PROFILE
            </Text>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('profile-view-own');
                onClose();
              }}
            >
              <Text ml="10px">View own profile</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('profile-customize');
                onClose();
              }}
            >
              <Text ml="10px">Customize own profile</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('profile-view-others');
                onClose();
              }}
            >
              <Text ml="10px">View others' profile</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('profile-reviews');
                onClose();
              }}
            >
              <Text ml="10px">Rate and review</Text>
            </Link>
            <Link
              _hover={{ bg: '#C5FFFF' }}
              onClick={() => {
                setContent('profile-edit-reviews');
                onClose();
              }}
            >
              <Text ml="10px">Edit or remove reviews</Text>
            </Link>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
