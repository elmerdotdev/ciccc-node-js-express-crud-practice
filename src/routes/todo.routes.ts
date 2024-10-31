// todos.routes.ts
import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoRequestBody } from '../types/todo';

const todoRouter = Router();

let todos: Todo[] = [];

// Fetch todos
todoRouter.get('/', (req: Request, res: Response) => {
  res.json(todos);
});

// Fetch todo by id
todoRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('Todo does not exist');
  }
});

// Add todo
todoRouter.post('/', (req: Request<{}, {}, TodoRequestBody>, res: Response) => {
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
todoRouter.put('/:id', (req: Request<{ id: string }, {}, TodoRequestBody>, res: Response) => {
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
todoRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const foundIndex = todos.findIndex(todo => todo.id === id);
  if (foundIndex !== -1) {
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).send('Todo was deleted!');
  } else {
    res.status(404).send('Todo does not exist');
  }
});

export default todoRouter;
