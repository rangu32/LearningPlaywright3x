/*
var  → older JavaScript. never use in modern code.
var is a keyword used to declare a variable in JavaScript. 
It can be used to declare variables that are function-scoped or globally-scoped. 
Variables declared with var can be re-declared and updated within its scope.

var browser = "Chrome";
browser = "Edge";          // Reassignment ✅
var browser = "Firefox";   // Redeclaration ✅

*/


var username = "admin";

console.log(username);


var username = "admin";

console.log(username);

username = "tester";

console.log(username);