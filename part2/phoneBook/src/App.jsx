import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import personService from './personService'; // Import the service module
import Filter from './Filter'; // Import the Filter component
import PersonForm from './PersonForm'; // Import the PersonForm component
import Persons from './Persons'; // Import the Persons component

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    personService.getAll()
      .then(data => {
        setPersons(data);
        setFilteredPersons(data);
      })
      .catch(error => console.error('Error fetching data', error));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
    if (event.target.value === '') {
      setFilteredPersons(persons);
    } else {
      const filtered = persons.filter(person =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredPersons(filtered);
    }
  };

  const addPerson = () => {
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
    personService.create(newPerson)
      .then(data => {
        const updatedPersons = persons.concat(data);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);
        setNewName('');
        setNewNumber('');
      })
      .catch(error => console.error('Error adding person:', error));
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    addPerson();
  };

  const handleDelete = (id) => {
    // Remove person from the database
    personService.remove(id)
      .then(() => {
        // Update the state after successful deletion
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);
      })
      .catch(error => console.error('Error deleting person:', error));
  };

  const checkForDuplicateName = (event) => {
    event.preventDefault();
    const duplicateName = persons.find(person => person.name === newName);
    const duplicateNumber = persons.find(person => person.number === newNumber);
    if (duplicateName) {
      alert(`${newName} is already added to phonebook`);
    } else if (duplicateNumber) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      handleAddPerson(event);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter value={searchName} onChange={handleSearchChange} />
      </form>

      <h2>Add a new number</h2>
      <PersonForm
        addPerson={checkForDuplicateName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
