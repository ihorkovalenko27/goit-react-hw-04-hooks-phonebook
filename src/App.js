import React, { useState } from 'react';
import shortid from 'shortid';
import Section from './components/section/Section';
import ContactForm from './components/contactForm/ContactForm';
import ContactList from './components/contactsList/ContactList';
import Filter from './components/filter/Filter';
import useLocalStorage from './components/hooks/useLocalStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addNewContact = (name, number) => {
    const newUserData = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts([newUserData, ...contacts]);
  };

  const removeContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filterContacts = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const visibleContacts = getVisibleContacts();
  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addNewContact} contacts={contacts} />
        <Filter value={filter} onChange={filterContacts} />
        <ContactList contacts={visibleContacts} onDeleteContact={removeContact} />
      </Section>
    </>
  );
}

export default App;
