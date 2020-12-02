const { execute } = require("../src/index");

test("outputs result", () => {
  expect(execute([['def', 'result', 5]])).toEqual(5)
});

test("addition", () => {
  expect(execute([['def', 'result', ['+', 5, 3]]])).toEqual(8);
});

test("addition with 3 arguments", () => {
  expect(execute([['def', 'result', ['+', 5, 3, 2]]])).toEqual(10);
});

test("multiplication", () => {
  expect(execute([['def', 'result', ['*', 5, 3]]])).toEqual(15);
});

test("multiplication and addition", () => {
  expect(execute([['def', 'result', ['*', 5, ['+', 3, 2]]]])).toEqual(25);
});

test("list literal", () => {
  expect(execute([['def', 'result', ['list', 1, 2, 3]]])).toEqual([1, 2, 3])
});

test("string literal", () => {
  expect(execute([['def', 'result', ['string', 'test']]])).toEqual('test')
});

test("other definitions", () => {
  expect(execute([
    ['def', 'x', ['+', 3, 2]],
    ['def', 'result', ['*', 5, 'x']]
  ])).toEqual(25);
});

test("apply", () => {
  expect(execute([
    ['def', 'myList', ['list', 3, 2]],
    ['def', 'result', ['+', ['apply', 'myList']]]
  ])).toEqual(5);
});

test("function definition", () => {
  // inc -> increment
  expect(execute([
    ['defn', 'inc', ['num'], ['+', 1, 'num']],
    ['def', 'result', ['inc', 3]]
  ])).toEqual(4);
});

test("reduce", () => {
  expect(execute([
    ['def', 'myList', ['list', 1, 2, 3]],
    ['def', 'result', ['reduce', '+', 'myList']]
  ])).toEqual(6);
});

test("reduce with initial", () => {
  expect(execute([
    ['def', 'myList', ['list', 1, 2, 3]],
    ['def', 'result', ['reduce', '+', 'myList', -1]]
  ])).toEqual(5);
});

test("map", () => {
  expect(execute([
    ['defn', 'inc', ['num'], ['+', 1, 'num']],
    ['def', 'myList', ['list', 1, 2]],
    ['def', 'result', ['map', 'inc', 'myList']]
  ])).toEqual(4);
});

test("filter", () => {
  // Will also require implementation of = (equals) and % (modulo)
  // Those could also use tests
  expect(execute([
    ['defn', 'odd?', ['num'], ['=', 1, ['%', 'num', 2]]],
    ['def', 'myList', ['list', 1, 2, 3]],
    ['def', 'result', ['filter', 'odd?', 'myList']]
  ])).toEqual([1, 3]);
});

test("let bindings", () => {
  // A let binding is like a list of local variables
  expect(execute([
    ['def', 'result', ['let', [
      ['x', 5], 
      ['y', 6], 
      ['z', ['+', 'x', 'y']]], 
      'z']]
  ])).toEqual(11);
});

test("not", () => {
  expect(execute([
    ['def', 'result', ['not', true]]
  ])).toEqual(false);
})

test("and", () => {
  expect(execute([
    ['def', 'result', ['and', true, true]]
  ])).toEqual(true);
});

test("or", () => {
  expect(execute([
    ['def', 'result', ['or', true, false]]
  ])).toEqual(true);
});
