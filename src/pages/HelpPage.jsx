import { React, useState } from 'react';
import { Divider, Flex } from '@chakra-ui/react';
import HelpMenu from '../components/Help/HelpMenu';
import TitleBar from '../components/TitleBar/TitleBar';
import HelpContent from '../components/Help/HelpContent';

export default function HelpPage() {
  const [content, setContent] = useState("overview-intro")
  return (
    <>
      <Flex flexDirection="vertical">
        <HelpMenu setContent={setContent}/>
        <Divider orientation="vertical" p={4}/>
        <HelpContent content={content}/>
      </Flex>
    </>
  );
}
