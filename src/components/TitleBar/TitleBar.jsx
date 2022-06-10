import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function TitleBar({ backButton, text }) {
  const navigate = useNavigate();

  return (
    <Flex align="center" px="6" py="4">
      {backButton && (
        <IconButton
          borderRadius="50%"
          icon={<MdArrowBack />}
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
