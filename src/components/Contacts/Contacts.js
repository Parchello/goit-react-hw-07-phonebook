import { useDispatch, useSelector } from 'react-redux';
import { ContactDelButton } from './Contacts.styled';

import { selectContacts, selectFilter } from 'Redux/selector';
import { deleteContact, fetchContacts } from 'Redux/servise';
import { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
} from '@mui/material';

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

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    const names = name.split(' ');
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0],
    };
  }

  return (
    <Container>
      <List>
        {visibleContacts.map(({ name, number, id }) => (
          <ListItem key={id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar {...stringAvatar(name)} />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={number} />
            <ContactDelButton
              variant="outlined"
              color="error"
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </ContactDelButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
