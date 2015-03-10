"use strict";

var assert = require("assert");

/**
  ### Either
*/

/**
  - `new Left(value : a) : Either a b`
*/
function Left(value) {
  this.value = value;
}

/**
  - `new Right(value : b) : Either a b`
*/
function Right(value) {
  this.value = value;
}

/**
  - `either.either(l: a -> x, r: b -> x): x`
*/
Left.prototype.either = function leftEither(l) {
  return l(this.value);
};

Right.prototype.either = function rightEither(l, r) {
  return r(this.value);
};

/**
  - `either.isEqual(other: Either a b): bool

      TODO: add `eq` optional parameter
*/
Left.prototype.isEqual = function leftIsEqual(other) {
  assert(other instanceof Left || other instanceof Right, "isEqual: `other` parameter should be Either");
  return other instanceof Left && this.value === other.value;
};

Right.prototype.isEqual = function rightIsEqual(other) {
  assert(other instanceof Left || other instanceof Right, "isEqual: `other` parameter should be Either");
  return other instanceof Right && this.value === other.value;
};

/**
  - `either.bimap(f: a -> c, g: b -> d): Either c d`

      ```js
      either.bimap(compose(f, g), compose(h, i)) ≡ either.bimap(f, h).bimap(g, i);
      ```

*/
Left.prototype.bimap = function leftBimap(f) {
  return new Left(f(this.value));
};

Right.prototype.bimap = function rightBimap(f, g) {
  return new Right(g(this.value));
};

/**
  - `either.first(f: a -> c): Either c b`

      ```js
      either.first(f) ≡ either.bimap(f, utils.identity)
      ```
*/
Left.prototype.first = function leftFirst(f) {
  return new Left(f(this.value));
};

Right.prototype.first = function rightFirst() {
  return this;
};

/**
  - `either.second(g: b -> d): Either a d`

      ```js
      either.second(g) === either.bimap(utils.identity, g)
      ```
*/
Left.prototype.second = function leftSecond() {
  return this;
};

Right.prototype.first = function rightSecond(g) {
  return new Right(g(this.value));
};
