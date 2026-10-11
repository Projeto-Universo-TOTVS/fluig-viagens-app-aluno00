"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");

test("valida Hello World Aluno!", () => {
  const firstTest = "hello world"
  assert(firstTest, "hello world");
});
