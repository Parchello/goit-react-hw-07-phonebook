import { useDispatch, useSelector } from 'react-redux';
import { ContactDelButton } from './Contacts.styled';

import { selectContacts, selectFilter } from 'Redux/selector';
import { deleteContact, fetchContacts } from 'Redux/servise';
import { useEffect } from 'react';

export const Contacts = () => {
  const value = useSelector(selectContacts);

  const nameFromFilter = useSelector(selectFilter);

  const visibleContacts = value.filter(item =>
    item.name.toLocaleLowerCase().includes(nameFromFilter.toLocaleLowerCase())
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      {
        <ul>
          {visibleContacts.map(({ name, number, id }) => (
            <li key={id}>
              <p>
                {name}: {number}
              </p>
              <ContactDelButton
                type="button"
                onClick={() => dispatch(deleteContact(id))}
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
