import { Flex } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase';

export default function ChatBoxMessages({ listingId }) {
  const auth = useAuth();
  const messagesRef = useRef(null);
  const [messages, setMessages] = useState(null);

  const scrollToBottom = () => {
    messagesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select()
        .eq('listing_id', listingId)
        .order('created_at');
      if (error) throw error;

      setMessages(data);

      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };
    getMessages();
  }, [listingId]);

  useEffect(() => {
    const subscription = supabase
      .from('messages')
      .on('INSERT', payload => {
        setMessages(prevMessages => [...prevMessages, payload.new]);
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <Flex direction="column" grow="1" overflowY="scroll" p="2" w="100%">
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
      <div ref={messagesRef}></div>
    </Flex>
  );
}
