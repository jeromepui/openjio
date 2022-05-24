import { Box, IconButton } from '@chakra-ui/react'
import { IoChevronBackCircleOutline } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import React from 'react'

export default function TitleBar(props) {
    const navigate = useNavigate();
  return (
    <Box>
        <IconButton onClick icon={<IoChevronBackCircleOutline />}></IconButton>
    </Box>
  )
}
