"use strict";
var _this = this;
exports.__esModule = true;
var todo_1 = require("./todo");
var MyTodo = new todo_1.Todo();
beforeAll(function () {
    var id1 = MyTodo.addItem("Test 1", "December 25, 2020 06:24:00", true);
    var id2 = MyTodo.addItem("Test 2", "September 4, 2020 03:24:00", false);
    var id3 = MyTodo.addItem("Test 3", "May 8 2020 03:24:00", false);
    var id4 = MyTodo.addItem("Test 4", "July 17, 2020 18:24:00", false);
    var id5 = MyTodo.addItem("Test 5", "November 12, 2020 12:24:00", true);
    var id6 = MyTodo.addItem("Test 6", "June 1, 2020 09:24:00", false);
    _this.IDs = [id1, id2, id3, id4, id5, id6];
    _this.notCompletedIDs = [id2, id3, id4, id6];
    _this.completedIDs = [id1, id5];
});
describe("addItem function", function () {
    // Tests uniqueness of IDs
    test("Adds items to list and tests the uniqueness of their IDs", function () {
        var duplicates = false;
        for (var i = 0; i < _this.IDs.length - 1; i++) {
            for (var j = i + 1; j < _this.IDs.length; j++) {
                if (_this.IDs[i] === _this.IDs[j]) {
                    duplicates = true;
                }
            }
        }
        expect(duplicates).toBe(false);
    });
    // Tests if it dosn"t accept an ivalid date
    test("Try to add invalid date, check that it throws expection", function () {
        expect(function () { MyTodo.addItem("Test 1", "November 56, 20220 123:24:00", true); }).toThrow("The date entered is not valid.");
    });
    // Is the Added Item in the list
    test("Adds item and looks to see if an item matching the despription is in the list", function () {
        var inList = false;
        var len = MyTodo.list.length;
        for (var i = 0; i < len - 1; i++) {
            if (MyTodo.list[i].description === "Test 4") {
                inList = true;
                break;
            }
        }
        expect(inList).toBe(true);
    });
});
describe("removeItem function", function () {
    // test remove item
    test("item is added then removed, then length is checked to be 0", function () {
        var id = MyTodo.addItem("Test 1", "June 1, 2020 09:24:00");
        var len1 = MyTodo.list.length;
        MyTodo.removeItem(id);
        var len2 = MyTodo.list.length;
        expect(len2).toBe(len1 - 1);
    });
});
describe("Listed Items", function () {
    // are all items listed
    test("checks that all items are listed when function is called", function () {
        var listedIDs = MyTodo.getListItems();
        var same = false;
        if (_this.IDs.sort().join(",") === listedIDs.sort().join(",")) {
            same = true;
        }
        expect(same).toBe(true);
    });
    // are all compeleted items listed
    test("checks that all items are listed when function is called", function () {
        var listedIDs = MyTodo.getNotCompletedListItems();
        var same = false;
        if (_this.notCompletedIDs.sort().join(",") === listedIDs.sort().join(",")) {
            same = true;
        }
        expect(same).toBe(true);
    });
    // are all not compelted items listed
    test("checks that all items are listed when function is called", function () {
        var listedIDs = MyTodo.getCompletedListItems();
        var same = false;
        if (_this.completedIDs.sort().join(",") === listedIDs.sort().join(",")) {
            same = true;
        }
        expect(same).toBe(true);
    });
});
// does clear function work
test("clear the list, see if length is zero", function () {
    MyTodo.clear();
    expect(MyTodo.list.length).toBe(0);
});
