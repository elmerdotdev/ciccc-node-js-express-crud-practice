"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Import routes
// import todoRouter from './routes/todo.routes';
// Set up Express
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Process incoming JSON
app.use((req, res, next) => {
    console.log(`Received request ${req.url} at ${new Date()}`);
    next();
});
// In-memory database
let todos = [];
// Routes
// app.use('/todos', todoRouter)
// Home
app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome to Home</h1>");
});
// Fetch todos
app.get('/todos', (req, res) => {
    res.json(todos);
});
// Fetch todo by id
app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    }
    else {
        res.status(404).send('Todo does not exist');
    }
});
// Add todo
app.post('/todos', (req, res) => {
    console.log(req.body);
    const todo = {
        id: (0, uuid_1.v4)(),
        text: req.body.todoText,
        user: req.body.user,
        completed: false,
    };
    todos.push(todo);
    res.status(201).json(todo);
});
// Update todo by id
app.put('/todos/:id', (req, res) => {
    var _a, _b;
    const { id } = req.params;
    const foundIndex = todos.findIndex(todo => todo.id === id);
    if (foundIndex !== -1) {
        const updatedTodo = Object.assign(Object.assign({}, todos[foundIndex]), { text: req.body.todoText, user: (_a = req.body.user) !== null && _a !== void 0 ? _a : todos[foundIndex].user, completed: (_b = req.body.completed) !== null && _b !== void 0 ? _b : todos[foundIndex].completed });
        todos[foundIndex] = updatedTodo;
        res.json(updatedTodo);
    }
    else {
        res.status(404).send('Todo does not exist');
    }
});
// Delete todo by id
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const foundIndex = todos.findIndex(todo => todo.id === id);
    if (foundIndex !== -1) {
        todos = todos.filter(todo => todo.id !== id);
        res.status(200).send('Todo was deleted!');
    }
    else {
        res.status(404).send('Todo does not exist');
    }
});
// Start server
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
