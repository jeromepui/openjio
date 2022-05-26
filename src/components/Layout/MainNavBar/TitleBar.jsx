import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function TitleBar({ backButton, text }) {
  const navigate = useNavigate();

  return (
    <Flex alignItems="center" px="6" py="4" w="100%">
      {backButton && (
        <IconButton
          borderRadius="50%"
          icon={<IoIosArrowRoundBack />}
          mr="4"
          onClick={() => navigate(-1)}
          size="sm"
        ></IconButton>
      )}
      <Heading fontSize="4xl" fontWeight="700">
        {text}
      </Heading>
    </Flex>
  );
}
