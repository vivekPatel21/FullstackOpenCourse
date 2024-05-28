import { useState } from 'react';
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([...persons]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
    setPersons(persons.concat(newPerson));
    setFilteredPersons(persons.concat(newPerson));
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
      addPerson();
    }
  };

  const SearchTarget = (event) => {
    event.preventDefault();
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={SearchTarget}>
        <Filter value={searchName} onChange={handleSearchChange} />
        <div>
          <button type="submit">Search</button>
        </div>
      </form>

      <h2>Add a new number</h2>
      <form onSubmit={checkForDuplicateName}>
        <PersonForm
          addPerson={addPerson}
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
