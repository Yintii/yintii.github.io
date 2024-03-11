---
layout: "post"
title: "Exploring JavaScript's Essential Array Functions: Map, Filter, and Reduce"
---

I am taking a little break from writing about the tax app here to talk about a more fundamental topic.
The tax app is coming along really great too, I'm integrating turbo now to help turn it more into a spa. 
Going to see if I like that and where that goes. Until then, we're talking about a set of functions I feel
as though all new developers should be aware of.

The array functions map, filter, and reduce are probably the most commonly used and some of the most powerful functions
that are available to you. If you're not completely aware of how to use these effectively, then this is the post for you.

## Map

The easiest and most common of the 3 is map. There is one other function, forEach, that is similar. 
I will explain the difference between the two here. 

Let's say you have an array of items, lets use a grocery list. 

```
const groceries = ['apple', 'orange', 'strawberry', 'milk', 'bread', 'eggs', 'cheese'];
```

With this data, you can use map to process each item of the array, and it returns a new array with the altered data.
Let's just set these items to uppercase.

```
let uppercase_list = groceries.map(item => item.toUpperCase());
console.log(uppercase_list); //['APPLE', 'ORANGE', 'STRAWBERRY', 'MILK', 'BREAD', 'EGGS', 'CHEESE']
```

The function forEach works similarly, however it does not return a new array, and it does not alter the original array data. It is up to you were you will use map and where to use forEach.

## Filter

Filter is the next function we often use for array processing. Here we can give the filter function a condition,
and for all the items in the array that pass the condition, it will return an array of those items. 

```
const entrants = [{name: 'john', age: 17}, {name: 'joe', age: 21}, {name: 'Cindy Lou Who', age: 4}, {name: 'karla', age: 30}];
```
Here we can take some user data, and filter users by age. We want to filter out the entrants who are older than 18.
```
let oldEnough = entrants.filter(entrant => entrant.age > 18);
console.log('The entrants old enough to enter: ', oldEnough);
```
If you run the code above, you'll see that only Joe and Karla were allowed entrance.

## Reduce

Reduce is the notoriously difficult one to understand and equally hard to explain well in my opinion.

A good example is counting up a total of unique items in an array. Take this array that will represent 
the color of the cars that pass by while a young boy and a old man sit on the sidewalk and eat ice cream.

```
const car_colors = ['red', 'red', 'blue', 'green', 'silver', 'silver', 'black', 'red', 'white', 'red', 'blue', 'yellow', 'black'];
```
Here we have many times and some of them repeat many times. We want to process these so we have the count of each color as a key-value pair.

With the reduce function, you actually pass in a callback, and an initial value, as well as you you will pass in an accumulator, 
and an index/current value to the callback (this is just the value we've passed to the other two functions).
Reduce returns the accumulator that you define. Here we will return an object with the 
counts of each color. What we're literally doing is reducing the array down to a single value, even if it's an object of many values.

```
let reduced_list = car_colors.reduce((totals, color) => {
    totals[color] = (totals[color] || 0) + 1
    return totals;
}, {})
console.log("Counts of each colors: ", totals);
```
When you run the following code, you should see a object of the counts of each color:
```
Counts of each colors:  
{red: 4, blue: 2, green: 1, silver: 2, black: 2, white: 1, yellow: 1}
```

### Conclusion
These three functions are extremely powerful, and will help you solve more problems with speed and eloquence. 
