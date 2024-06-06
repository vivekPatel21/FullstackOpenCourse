import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import personService from './personService';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

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
    const newPerson = { name: newName, number: newNumber, id: uuidv4() };
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

  const updatePerson = (id, updatedPerson) => {
    personService.update(id, updatedPerson)
      .then(data => {
        const updatedPersons = persons.map(person => person.id !== id ? person : data);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);
        setNewName('');
        setNewNumber('');
      })
      .catch(error => console.error('Error updating person:', error));
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(existingPerson.id, { ...existingPerson, number: newNumber });
      }
    } else {
      addPerson();
    }
  };

  const handleDelete = (id) => {
    personService.remove(id)
      .then(() => {
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);
      })
      .catch(error => console.error('Error deleting person:', error));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter value={searchName} onChange={handleSearchChange} />
      </form>

      <h2>Add a new number</h2>
      <PersonForm
        addPerson={handleAddPerson}
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
