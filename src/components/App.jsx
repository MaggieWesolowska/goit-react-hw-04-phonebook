import { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './ContactForm/ContactForm.module.css';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contactList')) ?? initialContacts
  );

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const addContact = newContact => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existingContact) {
      return `Contact with name ${newContact.name} already exists!`;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDelete = e => {
    setContacts(contacts.filter(contact => contact.id !== e));
  };

  const getFilteredContacts = () => {
    const filteredContactList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    return filteredContactList;
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#010101',
        background: '#D9DDDc',
        margin: 20,
        borderRadius: 5,
      }}
    >
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={addContact} />
      <h2 className={css.contacts}>Contacts</h2>
      <Filter filter={filter} handleChange={handleFilter} />
      <ContactList contacts={getFilteredContacts} handleDelete={handleDelete} />
    </div>
  );
};
