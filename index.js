const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

// const jsonParser = bodyParser.json();
// const urlEncodedParser = (bodyParser.urlencoded({ extended: false }))

// app.use(require('connect').bodyParser.json()); // undefined still
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json());

app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (!req.body) req.body = {};
    next(err);
  });
});

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'application/json'});
//     response.end(JSON.stringify(persons));
//     // response.end('Hello World!');
// });

// fucntion to generate a random ID using math.random
const generateId = () => {
  return Math.floor(Math.random() * 10000);
}

// post
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error:'name must be unique'
    });
  }

  const person = {
    id: generateId().toString(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person);

  response.json(person);
})

// Get front page
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
})

// Get all 
app.get('/api/persons', (request, response) => {
  response.json(persons);
})

// fetch a singular data
app.get('/persons/:id', (request, response) => {
    try {
      const id = request.params.id;
      const person = persons.find(person => person.id === id);
      if (!person) {
        throw "That ID does not exist";
      }
      finalMessage = person;
    } catch(err) {
      finalMessage = `Error: ${err}`;
    }

    response.json(finalMessage);

    
})


// Delete
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.filter(person => person.id !== id);
  response.status(204).end();
})

// Overall info
app.get('/info', (request, response) => {
  const d = new Date();
  const currentDateandTime = `${days[d.getDay()]} of ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} Time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  response.send(`<p>Phonebook has info for ${persons.length} people</p>\n\n<p>${currentDateandTime}</p>`);
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);