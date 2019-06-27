/**
* Function takes in a date object and prints and 
* formates the objects contents in the console.
*/
function printDate(date: Date): void {
    (date.getMonth() + 1) + "/" +
    date.getDate() + "/" +
    date.getFullYear() + " at " +
    date.getHours() + ":00"
}

/**
* Interface that carries attributes about items in the list including:
* Date Created,
* Description of Task,
* Date to due by,
* Unique ID for the task,
* Whether the task is done or not.
*/
export interface ListItem {
    createdAt: Date;
    description: string;
    dueAt: Date;
    id: number;
    doneAt: Date;
}

/**
* Todo is a class that when instantiated creates a todo list where
* items can be added, checked, and sorted in various ways.
*/
export class Todo {
    private list: ListItem[];
    private idNumber: number;
    constructor() {
        this.list = [];
        this.idNumber = 0; // dont need this
    }

    /**
    * Function allows user to add item to the todo list given
    * description, date due, and optional boolean if task is 
    * done.
    */
    public addItem(des: string, dateString: string, done: boolean = false) {
        const today: Date = new Date();
        const dueDate = new Date(dateString);
        var listItem: ListItem;
        if (!(dueDate instanceof Date && !isNaN(dueDate.valueOf()))) {
            throw new Error("The date entered is not valid.");
        }
        if(done === true){
            listItem = {
                createdAt: today,
                description: des,
                dueAt: dueDate,
                id: this.idNumber,
                doneAt: today 
            };
        }else{
             listItem = {
                createdAt: new Date(),
                description: des,
                dueAt: dueDate,
                id: this.idNumber,
                doneAt: undefined
            };
        }
        this.idNumber++;
        this.list.push(listItem);
        return listItem;
    }

    /**
    * Function that returns an item in the list given
    * it's ID.
    */
    public findItem(search: number): ListItem {
        return this.list.find(itm => itm.id === search);
    }

    /**
    * Function removes an item from the todo list given 
    * the ID of that item.
    */
    public removeItem(id: number): ListItem {
        var item: ListItem = this.findItem(id);
        this.list.splice(this.list.indexOf(item), 1);
        return item;
    }

    /**
     * Prints out infromation for all items in the 
     * todo list.
     */ 
    public getListItems(): number[] {
        for (const item of this.list) {
            const stat: string = (item ? "Completed" : " Not completed");
            console.log(
                "ID: " + item.id +
                ", Description: " + item.description +
                ", Created Date: " + printDate(item.createdAt) +
                ", Due Date: " + printDate(item.dueAt) +
                "Status: " + stat
            );
        }
        return this.list.map(itm => itm.id);
    }

    /**
     * Prints out information on each completed item
     * in the todo list.
     */
    public getCompletedListItems(): number[] {
        return (this.list.filter((itm) => itm.doneAt !== undefined)).map(itm => itm.id);
    }

    /**
     * Prints out information on each non-completed item
     * in the todo list.
     */
    public getNotCompletedListItems(): number[] {
        return (this.list.filter((itm) => itm.doneAt === undefined)).map(itm => itm.id);
    }

    /**
     * Function to clear the list of all todo items.
     */
    public clear(): void {
        this.list = [];
    }

    /**
     * Function marks a certian item as done given it's
     * ID and returns if the operation was successful.
     */
    public markDone(id: number) {
        var item: ListItem = this.findItem(id);
        if(item === undefined){
            throw new Error("Item with specified ID does not exist.");
        }
        item.doneAt = new Date();
    };

    /**
     * Return the list of todo items.
     */
    public getList(): ListItem[]{
        return this.list;
    }
}
