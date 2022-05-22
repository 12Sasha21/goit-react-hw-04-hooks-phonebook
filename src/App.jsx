import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Title from './components/Title/Title';
import SignupForm from './components/Form/Form';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import './index.css';

export default function Phonebook() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify([...contacts]));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts.`)
      : setContacts(prevContact => [...prevContact, newContact]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  return (
    <div className="container">
      <h1 className="visually_hidden">Phonebook</h1>
      <Title title="Phonebook" />
      <SignupForm addContact={addContact} />
      <Title title="Contacts" />
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        visibleContacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

// class Phonebook extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     const contact = {
//       id: uuidv4(),
//       name,
//       number,
//     };

//     contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
//       ? alert(`${name} is already in contacts.`)
//       : this.setState(prevState => ({
//           contacts: [contact, ...prevState.contacts],
//         }));
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   visibleContacts = () => {
//     const { contacts, filter } = this.state;

//     return contacts.filter(
//       contact =>
//         contact.name.toLowerCase().includes(filter.toLowerCase()) ||
//         contact.number.includes(filter)
//     );
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const nextContacts = this.state.contacts;
//     const prevContacts = prevState.contacts;
//     if (nextContacts !== prevContacts) {
//       localStorage.setItem('contacts', JSON.stringify(nextContacts));
//     }
//     if (
//       nextContacts.length > prevContacts.length &&
//       prevContacts.length !== 0
//     ) {
//     }
//   }

//   render() {
//     const { filter } = this.state;
//     const { addContact, changeFilter, deleteContact, visibleContacts } = this;
//     return (
//       <div className="container">
//         <h1 className="visually_hidden">Phonebook</h1>
//         <Title title="Phonebook" />
//         <SignupForm addContact={addContact} />
//         <Title title="Contacts" />
//         <Filter value={filter} onChange={changeFilter} />{' '}
//         <ContactList
//           visibleContacts={visibleContacts}
//           onDeleteContact={deleteContact}
//         />
//       </div>
//     );
//   }
// }

// export default Phonebook;
