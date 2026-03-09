What is the difference between var, let and const?
Ans: Difference between var, let and const: 
var: It is function-scoped and can be redeclared and updated. It was used in older JavaScript versions.
Let: It is block-scoped and can be updated but cannot be redeclared in the same scope.
Const: It is also block-scoped but cannot be updated or redeclared after the value is assigned.

What is the spread operator (...)?
Ans: The spread operator (...) in JavaScript is used to expand or copy elements from an array or object.
It allows us to combine arrays, copy arrays, or pass multiple values easily.
Example:
Const arr1 = [1,2,3];
Const arr2 = [...arr1, 4, 5];
Hare, …arr1  spreads the elements of arr1 into arr2.

What is the difference between map(), filter(), and forEach()?
Ans: The  difference between map(), filter(), and forEach() is how the process arrays. 
map(): creates a new array by applying a function to every element.
filter(): creates a new array with elements that pass a condition.
forEach(): Runs a function for each element but does not return a new array.

What is an arrow function?
Ans: An arrow function is a shorter way to write a function in JavaScript using the => syntax.
It makes the code simpler and easier to read.
Example:
const add = (a, b) => a + b;
This arrow function takes two parameters and returns their sum.
What are template literals?
Ans: Template literals are a way to write strings in JavaScript using backticks (``) instead of quotes.
They allow embedding variables and expressions inside a string using ${}.
Example:
Const name “Rakib”
console.log(`Hello ${name}`);
This makes string writing easier and more flexible.
