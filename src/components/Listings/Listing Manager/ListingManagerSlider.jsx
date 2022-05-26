import { Container } from '@chakra-ui/react';
import React from 'react';
import ListItem from './ListItem';
const testArray = [
  {
    website: 'https://www.pop.com',
    title: 'Hi',
    slots: '3',
    type: 'bundleDeal',
    desc: 'asdafsd',
    item: 'asdfa',
  },
  {
    website: 'https://www.p.com',
    title: 'Bye',
    slots: '3',
    type: 'bundleDeal',
    desc: 'asdafsd',
    item: 'asda',
  },
  {
    website: 'https://www.p.com',
    title: 'H',
    slots: '5',
    type: 'bundleDeal',
    desc: 'asdafsd',
    item: 'asdfa',
  },
  {
    website: 'https://www.pop.com',
    title: 'Hi',
    slots: '3',
    type: 'bundleDeal',
    desc: 'asdafsd',
    item: 'asdfa',
  },
  {
    website: 'https://www.pop.com',
    title: 'Hi',
    slots: '3',
    type: 'bundleDeal',
    desc: 'asdafsd',
    item: 'asdfa',
  },
  {
    website: 'https://www.pop.com',
    title: 'Hi',
    slots: '3',
    type: 'bundleDeal',
    desc: 'asdafsd',
    item: 'asdfa',
  },
  {
    website: 'https://www.pop.com',
    title: 'Hi',
    slots: '3',
    type: 'bundleDeal',
    desc: 'asdafsd',
    item: 'asdfa',
  },
];

export default function ListingManagerSlider(props) {
  return (
    <Container overflowY="scroll" height="90vh">
      {testArray.map(item => (
        <ListItem listing={item} category={props.category} />
      ))}
    </Container>
    // whole container should be replaced with listingradiogroup
  );
}
