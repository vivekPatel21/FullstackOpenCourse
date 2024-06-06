import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import personService from './personService';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notification, setNotification] = useState({ message: null, type: null });

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
        setNotification({ message: `Added ${newName}`, type: 'success' });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      })
      .catch(error => {
        console.error('Error adding person:', error);
        setNotification({ message: 'Error adding person', type: 'error' });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      });
  };

  const updatePerson = (id, updatedPerson) => {
    personService.update(id, updatedPerson)
      .then(data => {
        const updatedPersons = persons.map(person => person.id !== id ? person : data);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);
        setNewName('');
        setNewNumber('');
        setNotification({ message: `Updated ${updatedPerson.name}`, type: 'success' });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setNotification({ message: `Information of ${updatedPerson.name} has already been removed from server`, type: 'error' });
          setPersons(persons.filter(person => person.id !== id));
          setFilteredPersons(filteredPersons.filter(person => person.id !== id));
        } else {
          setNotification({ message: 'Error updating person', type: 'error' });
        }
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      });
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // Check if the person still exists before updating
        personService.getAll()
          .then(data => {
            const personExists = data.find(person => person.id === existingPerson.id);
            if (personExists) {
              updatePerson(existingPerson.id, { ...existingPerson, number: newNumber });
            } else {
              setNotification({ message: `Information of ${newName} has already been removed from server`, type: 'error' });
              setPersons(data); // Update the local state to reflect the current state of the server
              setFilteredPersons(data);
              setTimeout(() => {
                setNotification({ message: null, type: null });
              }, 5000);
            }
          })
          .catch(error => {
            setNotification({ message: 'Error fetching persons from server', type: 'error' });
            setTimeout(() => {
              setNotification({ message: null, type: null });
            }, 5000);
          });
      }
    } else {
      addPerson();
    }
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(id)
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== id);
          setPersons(updatedPersons);
          setFilteredPersons(updatedPersons);
          setNotification({ message: 'Person deleted', type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          setNotification({ message: 'Error deleting person', type: 'error' });
          setTimeout(() => {
            setNotification({ message: null, type: null });
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
