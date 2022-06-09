import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../supabase';

export default function ChatBoxFooter({ listingId }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message === '') return;

    try {
      const messageId = uuidv4();

      const newMessage = {
        message_id: messageId,
        listing_id: listingId,
        content: message,
      };

      const { error } = await supabase.from('messages').insert(newMessage);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setMessage('');
    }
  };

  return (
    <Flex px="4" py="2" w="100%">
      <Input
        border="none"
        borderRadius="none"
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        placeholder="Type Something..."
        value={message}
        variant="flushed"
      />
      <Button
        bg="#02CECB"
        color="white"
        _hover={{
          background: '#06837F',
        }}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
}
