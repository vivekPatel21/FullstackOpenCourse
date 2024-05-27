import React from 'react';

const Course = (prop) => {
  console.log("creating the course page, from ", prop.course);

  const total = prop.course.parts.reduce((accumulator, currentValue) => {
    console.log("attempting to retrieve the total");
    return accumulator + currentValue.exercises;
  }, 0);

  return (
    <div>
      <h1>{prop.course.name}</h1>
      <ul>
        {prop.course.parts.map((part) => (
          <li key={part.id}>
            <p>{part.name} {part.exercises}</p>
          </li>
        ))}
      </ul>
      <p>Total Number of Exercises: {total}</p>
    </div>
  );
};

export default Course;