import { Box, IconButton, Text } from '@chakra-ui/react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import TitleBarContext from '../../../contexts/TitleBarContext';
import { useContext } from 'react';

export default function TitleBar(props) {
  const navigate = useNavigate();
  const tBarContext = useContext(TitleBarContext)

  return (
    <Box
      w="100%"
      display="flex"
      alignItems="center"
      marginTop="1.0%"
      marginBottom="1.5%"
    >
      {tBarContext.backButton ? (
        <IconButton
          onClick={() => navigate(-1)}
          icon={<IoIosArrowRoundBack />}
          borderRadius="50%"
          marginRight="-1.75%"
          marginLeft="0.75%"
          size="sm"
        ></IconButton>
      ) : (
        <IconButton
          icon={<IoIosArrowRoundBack />}
          borderRadius="50%"
          visibility="hidden"
          display="none"
          marginRight="0.75%"
          marginLeft="0.75%"
          size="sm"
        ></IconButton>
      )}
      <Text
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="2xl"
        display="inline"
        marginLeft="3%"
      >
        {tBarContext.titleText}
      </Text>
    </Box>
  );
}
