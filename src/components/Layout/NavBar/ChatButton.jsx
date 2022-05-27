import { IconButton } from '@chakra-ui/react';
import { MdChat } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function ChatButton() {
  return (
    <Link to="/chat">
      <IconButton borderRadius="50%" icon={<MdChat />} />
    </Link>
  );
}
