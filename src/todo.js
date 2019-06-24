"use strict";
exports.__esModule = true;
// class that is use to create todo lists
var Todo = /** @class */ (function () {
    function Todo() {
        this.list = [];
        this.idNumber = 0;
    }
    // Function to add items
    Todo.prototype.addItem = function (des, dateString, done) {
        if (done === void 0) { done = false; }
        var today = new Date();
        var dueDate = new Date(dateString);
        if (dueDate instanceof Date && !isNaN(dueDate.valueOf())) {
            var listItem = {
                createdAt: today,
                description: des,
                dueAt: dueDate,
                id: this.idNumber,
                isDone: done
            };
            this.idNumber++;
            this.list.push(listItem);
            return listItem.id;
        }
        else {
            throw new Error("The date entered is not valid.");
        }
    };
    // Function to remove an Item given the ID
    Todo.prototype.removeItem = function (id) {
        this.list = this.list.filter(function (listItem) { return listItem.id !== id; });
    };
    // Prints out Info on each TODO item
    Todo.prototype.getListItems = function () {
        var listIDs = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            var stat = (item ? "Completed" : " Not completed");
            listIDs.push(item.id);
            console.log("ID: " + item.id +
                ", Description: " + item.description +
                ", Created Date: " + (item.createdAt.getMonth() + 1) + "/" +
                item.createdAt.getDate() + "/" +
                item.createdAt.getFullYear() + " at " +
                item.createdAt.getHours() + ":00" +
                ", Due Date: " + (item.dueAt.getMonth() + 1) + "/" +
                item.dueAt.getDate() + "/" +
                item.dueAt.getFullYear() + " at " +
                item.dueAt.getHours() + ":00" +
                "Status: " + stat);
        }
        return listIDs;
    };
    // Prints out Info on each TODO item
    Todo.prototype.getCompletedListItems = function () {
        var listIDs = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            var stat = (item.isDone ? "Completed" : " Not completed");
            if (item.isDone) {
                listIDs.push(item.id);
                console.log("ID: " + item.id + ", Description: " + item.description);
            }
        }
        return listIDs;
    };
    // Prints out Info on each TODO item
    Todo.prototype.getNotCompletedListItems = function () {
        var listIDs = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            var stat = (item.isDone ? "Completed" : " Not completed");
            if (!(item.isDone)) {
                listIDs.push(item.id);
                console.log("ID: " + item.id + ", Description: " + item.description);
            }
        }
        return listIDs;
    };
    // Clear all TODOs
    Todo.prototype.clear = function () {
        this.list = [];
    };
    // Mark as done
    Todo.prototype.markDone = function (id) {
        var success = false;
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id = id) {
                this.list[i].isDone = true;
                success = true;
            }
        }
        return success;
    };
    ;
    // Mark as done
    Todo.prototype.remove = function (id) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id = id) {
                var item = this.list[i];
                this.list.splice(i, 1);
                return item;
            }
        }
    };
    ;
    return Todo;
}());
exports.Todo = Todo;
