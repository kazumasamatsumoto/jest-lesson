function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test("mockFunctions", () => {
  const mockCallback = jest.fn((x) => 42 + x);
  forEach([0, 1], mockCallback);

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

test("this", () => {
  const myMock = jest.fn();

  const a = new myMock();
  a.name = "a";
  const b = {};
  b.name = "b";
  const bound = myMock.bind(b);
  bound();

  console.log(myMock.mock.instances);
});

test("someMockFunction", () => {
  const someMockFunction = jest.fn(() => "return value");

  someMockFunction("first arg", "second arg");
  expect(someMockFunction.mock.calls.length).toBe(1);
  expect(someMockFunction.mock.calls[0][0]).toBe("first arg");
  expect(someMockFunction.mock.calls[0][1]).toBe("second arg");
  expect(someMockFunction.mock.results[0].value).toBe("return value");

  const SomeMockConstructor = jest.fn();
  const a = new SomeMockConstructor();
  a.name = "test";
  const b = new SomeMockConstructor();

  expect(SomeMockConstructor.mock.instances.length).toBe(2);
  expect(SomeMockConstructor.mock.instances[0].name).toEqual("test");
});
