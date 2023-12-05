import { PhoneBook } from './PhoneBook/PhoneBook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <div>
      <h1>Phone Book</h1>
      <PhoneBook />
      <h2>Contacts</h2>
      <Filter />
      <Contacts />
      <Toaster />
    </div>
  );
};
