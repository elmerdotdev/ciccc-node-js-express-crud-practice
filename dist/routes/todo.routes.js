"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// todos.routes.ts
const express_1 = require("express");
const uuid_1 = require("uuid");
const todoRouter = (0, express_1.Router)();
let todos = [];
// Fetch todos
todoRouter.get('/', (req, res) => {
    res.json(todos);
});
// Fetch todo by id
todoRouter.get('/:id', (req, res) => {
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
todoRouter.post('/', (req, res) => {
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
todoRouter.put('/:id', (req, res) => {
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
todoRouter.delete('/:id', (req, res) => {
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
exports.default = todoRouter;
