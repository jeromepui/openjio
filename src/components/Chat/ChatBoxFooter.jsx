import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../supabase';

export default function ChatBoxFooter({ listingId }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
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
    <Flex p="2" w="100%">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: '1px solid black',
        }}
        // onKeyPress={e => {
        //   if (e.key === 'Enter') {
        //     handleSendMessage();
        //   }
        // }}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: 'white',
          color: 'black',
          border: '1px solid black',
        }}
        disabled={message.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
}
