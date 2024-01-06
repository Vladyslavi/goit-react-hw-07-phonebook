import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { fetchContacts } from '../../redux/operations';

import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm />
      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <Filter />
      ) : (
        <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
      )}
      {contacts.length > 0 && (
        <ContactList />
      )}
    </Container>
  );
};

export default App;