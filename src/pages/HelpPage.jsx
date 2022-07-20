import { React, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import HelpMenu from '../components/Help/HelpMenu';
import HelpContent from '../components/Help/HelpContent';
import HelpMenuMobile from '../components/Help/HelpMenuMobile';
import { HiDotsHorizontal } from 'react-icons/hi';
export default function HelpPage() {
  const [content, setContent] = useState('overview-intro');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex display={{ sm: 'none', md: 'flex' }}>
        <HelpMenu setContent={setContent} />
        <Divider orientation="vertical" p={4} />
        <HelpContent content={content} />
      </Flex>

      <IconButton
        onClick={onOpen}
        bg="#FDC100"
        borderRadius="50px"
        pl="16px"
        position="absolute"
        bottom="20px"
        right="20px"
        aria-label="Menu button for Help"
        icon={<HiDotsHorizontal />}
        display={{ sm: 'block', md: 'none' }}
        size="lg"
      />

      <Box pl="5%" pt="2%" w="100%" display={{ sm: 'block', md: 'none' }} overflowY="auto">
        <HelpContent content={content} />
      </Box>
      <HelpMenuMobile
        setContent={setContent}
        isOpen={isOpen}
        onClose={onClose}
        display={{ sm: 'block', md: 'none' }}
      />
    </>
  );
}
