/**
* Interface that carries attributes about items in the list including;
* Date Created
* Description of Task
* Date to due by
* Unique ID for the task
* Whether the task is done or not
*/
export interface ListItem {
    createdAt: Date;
    description: string;
    dueAt: Date;
    id: number;
    isDone: boolean;
}

// class that is use to create todo lists
export class Todo {
    public list: ListItem[];
    public idNumber: number;
    constructor() {
        this.list = [];
        this.idNumber = 0;
    }

    // Function to add items
    public addItem(des: string, dateString: string, done: boolean = false) {
        const today = new Date();
        const dueDate = new Date(dateString);
        if (dueDate instanceof Date && !isNaN(dueDate.valueOf())) {
            const listItem = {
                createdAt: today,
                description: des,
                dueAt: dueDate,
                id: this.idNumber,
                isDone: done,
            };
            this.idNumber++;
            this.list.push(listItem);
            return listItem;
        } else {
            throw new Error("The date entered is not valid.");
        }
    }

    // Function to remove an Item given the ID
    public removeItem(id: number): ListItem {
        var item: ListItem;
        const len: number = this.list.length;
        for (let i = 0; i < len; i++) {
            if (this.list[i].id == id) {
                item = this.list[i];
                this.list.splice(i,1);
            }
        }
        return item;
    }

    // Prints out Info on each TODO item
    public getListItems(): number[] {
        const listIDs: number[] = [];
        for (const item of this.list) {
            const stat: string = (item ? "Completed" : " Not completed");
            listIDs.push(item.id);
            console.log(
                "ID: " + item.id +
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
    }

    // Prints out Info on each TODO item
    public getCompletedListItems(): number[] {
        const listIDs: number[] = [];
        for (const item of this.list) {
            if (item.isDone) {
                listIDs.push(item.id);
                console.log("ID: " + item.id + ", Description: " + item.description);
            }
        }
        return listIDs;
    }

    // Prints out Info on each TODO item
    public getNotCompletedListItems(): number[] {
        const listIDs: number[] = [];
        for (const item of this.list) {
            if (!(item.isDone)) {
                listIDs.push(item.id);
                console.log("ID: " + item.id + ", Description: " + item.description);
            }
        }
        return listIDs;
    }

    // Clear all TODOs
    public clear(): void {
        this.list = [];
    }

    // Mark as done
    public markDone(id: number): boolean{
        var success = false;
        const len: number = this.list.length;
        for (let i = 0; i < len; i++) {
            if (this.list[i].id == id) {
                this.list[i].isDone = true;
                success = true;
                break;
            }
        }
        return success;
    };
}
