import React from 'react';
import PropTypes from 'prop-types';

const Persons = ({ persons, onDelete }) => {
  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this person?');
    if (isConfirmed) {
      onDelete(id);
    }
  };

  return (
    <div>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name}: {person.number}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
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
  ).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Persons;
