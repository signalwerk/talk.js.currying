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

const isGreaterThan = curry((limit, value) => value > limit);
const isSmallerThan = curry((limit, value) => value < limit);
const isNumber = curry((value) => typeof value === "number");

const zipValidator = all([isGreaterThan(999), isSmallerThan(10000), isNumber]);

console.log(zipValidator("1000")); // false
console.log(zipValidator(999)); // false
console.log(zipValidator(1000)); // true
console.log(zipValidator(9999)); // true
console.log(zipValidator(10000)); // true
