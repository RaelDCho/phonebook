const express = require('express');
const app = express();

app.use(express.json());

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

app.post('/persons', (request, response) => {
  const person = request.body;
  console.log(person);
  response.json(person);

  // generate a new ID using math.random
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
})

app.get('/persons', (request, response) => {
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

app.delete('/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.filter(person => person.id !== id);
  response.status(204).end();
})

app.get('/info', (request, response) => {
  const d = new Date();
  const currentDateandTime = `${days[d.getDay()]} of ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} Time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  response.send(`<p>Phonebook has info for ${persons.length} people</p>\n\n<p>${currentDateandTime}</p>`);
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);