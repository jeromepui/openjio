import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import { supabase } from '../../supabase';

export default function ChatBoxMessages({ listingId }) {
  const messagesRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(null);

  const scrollToBottom = () => {
    messagesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('messages')
          .select()
          .eq('listing_id', listingId)
          .order('created_at');

        setMessages(data);
        if (error) throw error;
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
        <Flex align="center" h="78vh" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex direction="column" h="78vh" overflowY="scroll" p="2">
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
