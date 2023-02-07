---
theme: signalwerk
title: Currying in JavaScript
---

```fm
style: negative
background: true
```

## Hello _👋_

# {{process.content.frontmatter.title}}

_Basics · Functional Programming_

<footer>

2022 · Zurich · Team Talks · Stefan Huber

</footer>

--s--

## Why?

- There was one talk missing
- It's cool and maybe you can use it

--s--

```fm
style: negative
background: true
```

## Basis

# _Functional_ programming

--s--

## Object oriented programming

<div style="font-size: 0.75em;">

```js
class Rectangle {
  // Properties
  height = 0;
  width = 0;

  // constructor
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  // Method
  area() {
    return this.height * this.width;
  }
}
```

</div>

--s--

## Usage

```js
const rect = new Rectangle(10, 10);

rect.area(); // → 100
```

--s--

## Functional

```js
function area(width, height) {
  return width * height;
}

// use
area(10, 10); // → 100
```

--s--

## Currying

<div style="font-size: 0.75em;">

```js
function area(width, height) {
  return width * height;
}

const curriedArea = curry(area); // convert to curried function

// use
curriedArea(10, 10); // → 100

const width10calculator = curriedArea(10); // → returns a function

width10calculator(10); // → 100
width10calculator(15); // → 150
```

</div>
--s--

## Why?

- Splitting up a function into smaller functions
- Reuse functions
- Easier to read
- Easier to test

--s--

## Combine

<div style="font-size: 0.75em;">

```js
const isGreaterThan = curry((limit, value) => value > limit);
const isSmallerThan = curry((limit, value) => value < limit);
const isNumber = curry((value) => typeof value === "number");
```

</div>
--s--

## Combine

<div style="font-size: 0.75em;">

```js
const zipValidator = all([
  // checks
  isGreaterThan(999),
  isSmallerThan(10000),
  isNumber,
]);

zipValidator("1000"); // false
zipValidator(999); // false
zipValidator(1000); // true
zipValidator(9999); // true
zipValidator(10000); // true
```

</div>

--s--

## How?

- you saw `curry` and `all`
- Just use a functional Library like [Ramda](https://ramdajs.com/)
- or write your own
  --s--

## How?

<div style="font-size: 0.7em;">

```js
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const all = curry((fns, value) => {
  return fns.reduce((acc, fn) => {
    return acc && fn(value);
  }, true);
});
```

</div>


--s--

```fm
style: negative
background: true
```

## exit 0; thx

# Questions?
