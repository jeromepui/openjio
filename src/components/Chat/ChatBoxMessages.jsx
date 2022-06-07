import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import ChatMessage from './ChatMessage';
import { useAuth } from '../../contexts/AuthContext';

export default function ChatBoxMessages({ listingId }) {
  const auth = useAuth();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select()
        .eq('listing_id', listingId)
        .order('created_at');
      if (error) throw error;

      setMessages(data);
    };
    getMessages();
  }, [listingId]);

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages?.map((message, index) => {
        if (message.sender_id === auth.user.id) {
          return (
            <ChatMessage content={message.content} key={index} sender="me" />
          );
        } else {
          return (
            <ChatMessage content={message.content} key={index} sender="other" />
          );
        }
      })}
    </Flex>
  );
}
