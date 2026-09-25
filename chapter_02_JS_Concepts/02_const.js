/*
const — declares a variable that cannot be reassigned later. 
Use this by default, unless you know the value needs to change.

Playwright real-world example:

const loginUrl = "https://example.com/login";
let attemptCount = 0;

await page.goto(loginUrl);
attemptCount = attemptCount + 1;

Explanation:

loginUrl is a const — the login page's address never changes during the test, so it's locked in.
attemptCount is a let — because we update it (attemptCount = attemptCount + 1) as the test runs, e.g., tracking retry attempts.
If you tried loginUrl = "somethingElse" after declaring it as const, JavaScript would throw an error — that's const protecting you from accidentally overwriting a value you didn't mean to change.

*/



const total = 100;
let discount = 20;
let finalPrice = total - discount;
finalPrice = finalPrice - 5;
///total = total - 10;

console.log(finalPrice);
console.log(finalPrice);
//console.log(total);

