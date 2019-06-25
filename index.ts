const express = require('express');
const todo = require("./src/todo");
const MyTodo = new todo.Todo();
const app = express();
const port = 3000;


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    const listDes = [];
    if (MyTodo.list.length !== 0) {
        const len = MyTodo.list.length;
        for (let i = 0; i < len; i++) {
            listDes.push(MyTodo.list[i].description)
        }
        res.json(listDes);
    } else {
        res.json('No items in list.');
    }
});

app.post('/', function (req, res) {
    const todoItem = MyTodo.addItem(req.body.Description, req.body.Date, req.body.IsDone);
    if (req.body.Description !== undefined || req.body.Date !== undefined) {
        res.json(todoItem);
    } else {
        res.sendStatus(400);
    }
});

app.put('/:id/done', function (req, res) {
    var success = MyTodo.markDone(req.params.id);
    if (success) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.delete('/:id', function (req, res) {
    const todoItem = MyTodo.removeItem(req.params.id);
    if (todoItem !== undefined) {
        res.send(todoItem);
    } else {
        res.sendStatus(400);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
