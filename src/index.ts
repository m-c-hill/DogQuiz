// Basic types
let id: number = 5;
let company: string = "Madrigal"
let isPublished: boolean = true;
let x: any = '45';

// Array
let ids: number[] = [1, 2, 3, 4, 5];
let arr: any[] = [1, true, 'Hello'];

// Tuple
let person: [number, string, boolean] = [1, 'Matt', true];

// Tuple array
let employee: [number, string][];
employee = [
    [1, 'Matt'],
    [2, 'Talia']
];

// Union
let pid: string | number;

// Enum
enum Direction1 {
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4,
};

// Objects and types
type User = {
    id: number,
    name: string
};

const user: User = {
    id: 1,
    name: 'Matt'
};

// Type assertion - treat entity as different type
let cid: any = 1;
//let customerId = <number>cid;
let customerId = cid as number;

// Functions
function addNum(x: number, y: number): number {
    return x + y;
};

// Interface
interface UserInterface {
    readonly id: number,
    name: string
};

const user2: UserInterface = {
    id: 1,
    name: 'Talia'
};

interface MathFunc {
    (x: number, y: number): number
};

const add: MathFunc = (x: number, y: number): number => x + y;
const sub: MathFunc = (x: number, y: number): number => x - y;

// Classes
// Fields can be public, private (only accessed from within class) and protected (only access within this class or class extended from this class)
class Person {
    private id: number
    private name: string

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    register() {
        return `${this.name} is now registered`
    }
}

const matt = new Person(1, 'Matt');
const talia = new Person(2, 'Talia');

console.log(matt, talia);

