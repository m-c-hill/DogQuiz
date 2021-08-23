"use strict";
// Basic types
let id = 5;
let company = "Madrigal";
let isPublished = true;
let x = '45';
// Array
let ids = [1, 2, 3, 4, 5];
let arr = [1, true, 'Hello'];
// Tuple
let person = [1, 'Matt', true];
// Tuple array
let employee;
employee = [
    [1, 'Matt'],
    [2, 'Talia']
];
// Union
let pid;
// Enum
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 1] = "Up";
    Direction1[Direction1["Down"] = 2] = "Down";
    Direction1[Direction1["Left"] = 3] = "Left";
    Direction1[Direction1["Right"] = 4] = "Right";
})(Direction1 || (Direction1 = {}));
;
const user = {
    id: 1,
    name: 'Matt'
};
// Type assertion - treat entity as different type
let cid = 1;
//let customerId = <number>cid;
let customerId = cid;
// Functions
function addNum(x, y) {
    return x + y;
}
console.log(addNum(1, 2));
