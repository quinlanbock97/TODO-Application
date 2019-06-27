import { Todo } from "./todo";
import { ListItem } from "./todo";
const MyTodo = new Todo();

beforeAll(() => {
    const id1: number = MyTodo.addItem("Test 1", "December 25, 2020 06:24:00", true).id;
    const id2: number = MyTodo.addItem("Test 2", "September 4, 2020 03:24:00", false).id;
    const id3: number = MyTodo.addItem("Test 3", "May 8 2020 03:24:00", false).id;
    const id4: number = MyTodo.addItem("Test 4", "July 17, 2020 18:24:00", false).id;
    const id5: number = MyTodo.addItem("Test 5", "November 12, 2020 12:24:00", true).id;
    const id6: number = MyTodo.addItem("Test 6", "June 1, 2020 09:24:00", false).id;
    this.IDs = [id1, id2, id3, id4, id5, id6];
    this.notCompletedIDs = [id2, id3, id4, id6];
    this.completedIDs = [id1, id5];
});

describe("addItem function", () => {
    // Tests uniqueness of IDs
    test("Adds items to list and tests the uniqueness of their IDs", () => {
        let duplicates: boolean = false;
        for (let i = 0; i < this.IDs.length - 1; i++) {
            for (let j = i + 1; j < this.IDs.length; j++) {
                if (this.IDs[i] === this.IDs[j]) {
                    duplicates = true;
                }
            }
        }
        expect(duplicates).toBe(false);
    });

    // Tests if it dosn't accept an ivalid date
    test("Try to add invalid date, check that it throws expection", () => {
        expect(function (){ MyTodo.addItem("Test 1", "November 56, 20220 123:24:00") }).toThrow("The date entered is not valid.");
    });

    // Is the Added Item in the list
    test("Adds item and looks to see if an item matching the despription is in the list", () => {
        let inList: boolean = false;
        const len: number = MyTodo.getList().length;
        for (let i = 0; i < len - 1; i++) {
            if (MyTodo.getList()[i].description === "Test 4") {
                inList = true;
                break;
            }
        }
        expect(inList).toBe(true);
    });
});

describe("removeItem function", () => {
    // test remove item
    test("item is added then removed, then length is checked to be 0", () => {
        const id: number = MyTodo.addItem("Test Remove", "June 1, 2020 09:24:00").id;
        const len1: number = MyTodo.getList().length;
        MyTodo.removeItem(id);
        const len2: number = MyTodo.getList().length;
        expect(len2).toBe(len1 - 1);
    });
});

describe("change status function", () => {
    // test the changing of isDone
    test("item whose status is false is changed to true and is tested", () => {
        const id: number = MyTodo.addItem("Test Change Status", "June 1, 2020 09:24:00").id;
        MyTodo.markDone(id);
        var marked: Date = undefined;
        const len: number = MyTodo.getList().length;
        for (let i = 0; i < len; i++) {
            if (MyTodo.getList()[i].id == id) {
                marked = MyTodo.getList()[i].doneAt;
                break;
            }
        }
        MyTodo.removeItem(id);
        expect(typeof marked).toBeTruthy();
        
    });
});

describe("Listed Items", () => {
    // are all items listed
    test("checks that all items are listed when function is called", () => {
        const listedIDs: number[] = MyTodo.getListItems();
        let same: boolean = false;
        if (this.IDs.sort().join(",") === listedIDs.sort().join(",")) {
            same = true;
        }
        expect(same).toBe(true);
    });

    // are all compeleted items listed
    test("checks that compeleted items are listed when function is called", () => {
        const listedIDs: number[] = MyTodo.getNotCompletedListItems();
        let same: boolean = false;
        if (this.notCompletedIDs.sort().join(",") === listedIDs.sort().join(",")) {
            same = true;
        }
        expect(same).toBe(true);
    });

    // are all not compeleted items listed
    test("checks that not compeleted items are listed when function is called", () => {
        const listedIDs: number[] = MyTodo.getCompletedListItems();
        let same: boolean = false;
        if (this.completedIDs.sort().join(",") === listedIDs.sort().join(",")) {
            same = true;
        }
        expect(same).toBe(true);
    });
});

// does clear function work
test("clear the list, see if length is zero", () => {
    MyTodo.clear();
    expect(MyTodo.getList().length).toBe(0);
});
