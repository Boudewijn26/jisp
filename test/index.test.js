const { execute } = require("../src/index");

test("outputs result", () => {
  expect(execute([['def', 'result', 5]])).toEqual(5)
});
