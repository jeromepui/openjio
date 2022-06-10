import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase';
import { getUserProfile } from '../../utils/UserUtils';

export default function ChatBoxFooter({ listingId }) {
  const auth = useAuth();
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message === '') return;

    try {
      const messageId = uuidv4();

      const { data, error: userError } = await getUserProfile(auth.user.id);
      if (userError) throw userError;

      const newMessage = {
        message_id: messageId,
        listing_id: listingId,
        content: message,
        sender_username: data.username,
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
    <Flex align="center" grow="1" justify="center" px="4" w="100%">
      <Input
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
