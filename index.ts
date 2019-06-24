const express = require('express');
const app = express();
const port = 3000;
const todo = require("./src/todo");
const MyTodo = new todo.Todo();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    const listDes = [];
    if (MyTodo.list.length !== 0) {
        const len = MyTodo.list.length;
        for (let i = 0; i < len; i++) {
            listDes.push(MyTodo.list[i].description)
        }
        res.send(listDes + '\n');
    } else {
        res.status(404);
        res.send('No items in list. \n');
    }
});

app.post('/', function (req, res) {
    const todoItem = MyTodo.addItem(req.body.Description, req.body.Date, req.body.IsDone);
    res.send(JSON.stringify(todoItem)+'\n');
});

app.put('/:id/done', function (req, res) {
    var success = MyTodo.markDone(req.params.id);
    if (success) {
        res.status(200).send('success \n');
    } else {
        res.status(406).send('no success \n');
    }
});

app.delete('/:id', function (req, res) {
    const todoItem = MyTodo.removeItem(req.params.id);
    res.status(200).send(todoItem);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
