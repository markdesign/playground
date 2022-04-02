/*
No BS TS #12 - Typescript Classes; Member Visibility and Implements
https://www.youtube.com/watch?v=PbswZshAKF8&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=14


*/

// Example 1
// Imagine this is a database.ts file

interface Database {
    get(id: string): string;
    set(id: string, value: string): void;
}

// implements example and protected example
class InMemoryDatabase implements Database {
    // this is protected, can be accesed inside. private would not work for descendants
    protected db: Record<string, string> = {};
    get(id: string): string {
        return this.db[id];
    }
    set(id: string, value: string): void {
        this.db[id] = value;
    }
}

//
interface Persistable {
    saveToString(): string;
    restoreFromString(storedState: string): void;
}

// extends example
class PersistentMemoryDB extends InMemoryDatabase implements Persistable {
    saveToString(): string {
        return JSON.stringify(this.db); // this.db would not work if private. but works if protected.
    }
    restoreFromString(storedState: string): void {
        this.db = JSON.parse(storedState);
    }
}

const myDB = new PersistentMemoryDB();

myDB.set("foo", "bar");
myDB.db["foo"] = "baz"; // prevent this from happening! use protected.
console.log(myDB.get("foo"));

const saved = myDB.saveToString();
myDB.set("foo", "db1 - bar");

const myDB2 = new PersistentMemoryDB();
myDB2.restoreFromString(saved);
console.log(myDB2.get("foo"));
