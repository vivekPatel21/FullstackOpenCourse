import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <div>
      Filter shown with: <input value={value} onChange={onChange} />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

PersonForm.propTypes = {
  addPerson: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  newNumber: PropTypes.string.isRequired,
  handleNumberChange: PropTypes.func.isRequired
};

const Persons = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map(person =>
          <li key={person.id}>{person.name}: {person.number}</li>
        )}
      </ul>
    </div>
  );
};

Persons.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/persons')
      .then(response => response.json())
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

  const addPerson = (newPerson) => {
    fetch('http://localhost:3001/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPerson)
    })
    .then(response => response.json())
    .then(data => {
      const updatedPersons = persons.concat(data);
      setPersons(updatedPersons);
      setFilteredPersons(updatedPersons);
    })
    .catch(error => console.error('Error adding person:', error));
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
    addPerson(newPerson);
    setNewNumber('');
    setNewName('');
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
      <form onSubmit={checkForDuplicateName}>
        <PersonForm
          addPerson={handleAddPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </form>

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
