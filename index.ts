const express = require('express');
const todo = require("./src/todo");
const jsonlint = require("jsonlint");
const MyTodo = new todo.Todo();
const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    const listTodo = [];
    for (let i = 0; i < MyTodo.list.length; i++) {
        listTodo.push(MyTodo.list[i])
    }
    res.json(listTodo); //list of obejcts not descriptions
});

app.post('/', function (req, res) {
    const jsonObject:any = jsonlint.parse(req);
    if (typeof jsonObject !== 'undefined') {
        res.json(MyTodo.addItem(jsonObject.Description, jsonObject.Date, jsonObject.IsDone));
    } else {
        res.sendStatus(400);
    }
});

app.put('/:id/done', function (req, res) {
    try{
        MyTodo.markDone(req.params.id);
    }catch{
        res.sendStatus(404);
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
