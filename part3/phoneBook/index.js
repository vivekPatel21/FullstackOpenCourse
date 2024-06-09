console.log("starting...");

const express = require('express');
const morgan = require('morgan'); // Import Morgan
const app = express();

app.use(express.json());

let data = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
];

// Create custom tokens for ID, name, and number
morgan.token('custom-id', (req) => req.body.id || '');
morgan.token('custom-name', (req) => req.body.name || '');
morgan.token('custom-number', (req) => req.body.number || '');

// Define a custom format that includes the tokens
const format = ':method :url :status :response-time ms - ID: :custom-id Name: :custom-name Number: :custom-number';

// Use Morgan with the custom format
app.use(morgan((tokens, req, res) => {
  if (req.method === 'POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res), 'ms',
      '- ID:', tokens['custom-id'](req, res),
      'Name:', tokens['custom-name'](req, res),
      'Number:', tokens['custom-number'](req, res)
    ].join(' ');
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
}));

app.get('/api/numbers/:id', (request, response) => {
  const IDNumber = Number(request.params.id);
  const phoneNumber = data.find(phoneNumber => phoneNumber.id === IDNumber);

  console.log(`The phone number is ${phoneNumber ? phoneNumber.number : 'not found'} \nThe ID number is ${IDNumber}`);
  
  if (phoneNumber) {
    response.json(phoneNumber);
  } else {
    response.status(404).json({error: `No result for ID ${IDNumber}`});
  }
});

app.use((error, request, response, next) => {
  console.error(error.message);
  response.status(500).send({ error: 'Something went wrong!' });
});

const generateId = () => {
  const maxId = data.length > 0
    ? Math.max(...data.map(n => n.id))
    : 0;
  return maxId + 1;
};

app.post('/api/numbers', (request, response) => {
  const person = request.body;
  
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }

  const duplicate = data.filter(entry => entry.name === person.name);

  if (duplicate.length > 0) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  const number = {
    id: generateId(),
    name: person.name,
    number: person.number,
  };

  data = data.concat(number);

  response.json(number);
});

app.delete('/api/numbers/:id', (request, response) => {
  const id = Number(request.params.id);
  const initialLength = data.length;
  data = data.filter(data => data.id !== id);

  if (data.length === initialLength) {
    return response.status(404).json({ error: `No result for ID ${id}` });
  }

  response.status(204).end(); 
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/info', (request, response) => {
  const currentTime = new Date(); 
  const numberOfEntries = data.length;

  const responseContent = `<p>Phone book has info for ${numberOfEntries} people<br></br>${currentTime}</p>`;

  response.send(responseContent);
});
