import React from 'react';
import PropTypes from 'prop-types';

const Persons = ({ persons, onDelete }) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      onDelete(id);
    }
  };

  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>
          {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

Persons.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Persons;
