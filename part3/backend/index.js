const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('./build'));

morgan.token('body', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// GET
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// GET
app.get('/api/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p`
  );
});

// GET
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// DELETE
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

// POST
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  }

  if (persons.map((p) => p.name).includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  response.status(201).json(person);
});

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];
