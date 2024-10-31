import express, { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

// Define types
import { Todo, TodoRequestBody } from './types/todo';

// Import routes
// import todoRouter from './routes/todo.routes';

// Set up Express
const app = express();

// Middleware
app.use(express.json()); // Process incoming JSON
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Received request ${req.url} at ${new Date()}`)
  next()
})

// In-memory database
let todos: Todo[] = [];

// Routes
// app.use('/todos', todoRouter)

// Home
app.get('/', (req: Request, res: Response) => {
  res.status(200).send("<h1>Welcome to Home</h1>")
})

// Fetch todos
app.get('/todos', (req: Request, res: Response) => {
  res.json(todos);
});

// Fetch todo by id
app.get('/todos/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('Todo does not exist');
  }
});

// Add todo
app.post('/todos', (req: Request<{}, {}, TodoRequestBody>, res: Response) => {
  console.log(req.body)

  const todo: Todo = {
    id: uuidv4(),
    text: req.body.todoText,
    user: req.body.user,
    completed: false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update todo by id
app.put('/todos/:id', (req: Request<{ id: string }, {}, TodoRequestBody>, res: Response) => {
  const { id } = req.params;
  const foundIndex = todos.findIndex(todo => todo.id === id);
  if (foundIndex !== -1) {
    const updatedTodo: Todo = {
      ...todos[foundIndex],
      text: req.body.todoText,
      user: req.body.user ?? todos[foundIndex].user,
      completed: req.body.completed ?? todos[foundIndex].completed,
    };
    todos[foundIndex] = updatedTodo;
    res.json(updatedTodo);
  } else {
    res.status(404).send('Todo does not exist');
  }
});

// Delete todo by id
app.delete('/todos/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const foundIndex = todos.findIndex(todo => todo.id === id);
  if (foundIndex !== -1) {
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).send('Todo was deleted!');
  } else {
    res.status(404).send('Todo does not exist');
  }
});

// Start server
const PORT: number = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
})