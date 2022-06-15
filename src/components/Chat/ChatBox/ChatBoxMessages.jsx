import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import { supabase } from '../../../supabase';
import { getMessagesByListing } from '../../../utils/MessageUtils';

export default function ChatBoxMessages({ listingId }) {
  const messagesRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    messagesRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await getMessagesByListing(listingId);
        if (error) throw error;
        setMessages(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [listingId]);

  useEffect(() => {
    const subscription = supabase
      .from(`messages:listing_id=eq.${listingId}`)
      .on('INSERT', payload => {
        setMessages(prevMessages => [...prevMessages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [listingId]);

  return (
    <>
      {loading ? (
        <Flex align="center" h="80vh" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex direction="column" h="80vh" overflowY="scroll" p="2">
          {messages?.map((message, index) => (
            <ChatMessage
              content={message.content}
              key={index}
              senderId={message.sender_id}
              senderUsername={message.sender_username}
            />
          ))}
          <div ref={messagesRef}></div>
        </Flex>
      )}
    </>
  );
}
