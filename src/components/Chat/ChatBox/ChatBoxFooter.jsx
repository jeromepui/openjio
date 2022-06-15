import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../../contexts/AuthContext';
import { sendMessage } from '../../../utils/MessageUtils';
import { getUserProfile } from '../../../utils/UserUtils';

export default function ChatBoxFooter({ listingId }) {
  const auth = useAuth();
  const [content, setContent] = useState('');

  const handleSendMessage = async () => {
    if (content === '') return;
    try {
      const messageId = uuidv4();
      const { data, error: userError } = await getUserProfile(auth.user.id);
      if (userError) throw userError;

      const message = {
        content: content,
        listing_id: listingId,
        message_id: messageId,
        sender_username: data.username,
      };
      const { error: messageError } = await sendMessage(message);
      if (messageError) throw messageError;
    } catch (error) {
      alert(error.message);
    } finally {
      setContent('');
    }
  };

  return (
    <Flex align="center" grow="1" justify="center" px="4">
      <Input
        onChange={e => setContent(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        placeholder="Type something..."
        value={content}
        variant="flushed"
      />
      <Button
        _hover={{
          background: '#06837F',
        }}
        bg="#02CECB"
        color="white"
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
}
