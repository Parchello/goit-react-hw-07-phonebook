import { useDispatch, useSelector } from 'react-redux';
import { ContactDelButton } from './Contacts.styled';
import { onDelete } from 'Redux/contactsSlice';

export const Contacts = () => {
  const value = useSelector(getContacts);
  function getContacts(state) {
    return state.contacts.contacts;
  }
  const nameFromFilter = useSelector(state => state.filter);
  const filteredContacts = value.filter(({ name }) =>
    name.toLowerCase().includes(nameFromFilter.toLowerCase())
  );
  const dispatch = useDispatch();

  return (
    <div>
      {
        <ul>
          {filteredContacts.map(contact => (
            <li key={contact.id}>
              <p>
                {contact.name}: {contact.number}
              </p>
              <ContactDelButton
                type="button"
                onClick={() => dispatch(onDelete(contact.id))}
              >
                delete
              </ContactDelButton>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
