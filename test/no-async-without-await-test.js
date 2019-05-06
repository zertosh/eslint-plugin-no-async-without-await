'use strict';

const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {ecmaVersion: 9}
});

const MESSAGE = 'Unnecessary async (only use async when await is needed).';

var ruleTester = new RuleTester();
ruleTester.run('no-async-without-await', require('../no-async-without-await'), {
  valid: [
    {code: 'function f() {}'},
    {code: '(function f() {})'},
    {code: '(function () {})'},
    {code: '() => {}'},
    {code: 'class C { m() {} }'},
    {code: 'class C { static m() {} }'},

    {code: 'async function f() { await x }'},
    {code: '(async function f() { await x })'},
    {code: '(async function() { await x })'},
    {code: 'async () => { await x }'},
    {code: 'class C { async m() { await x } }'},
    {code: 'class C { static async m() { await x } }'},

    {code: 'throw x'},

    {
      code: 'async function f() { throw x }',
      options: ['allow-throw'],
    },
    {
      code: '(async function f() { throw x })',
      options: ['allow-throw'],
    },
    {
      code: '(async function() { throw x })',
      options: ['allow-throw'],
    },
    {
      code: 'async () => { throw x }',
      options: ['allow-throw'],
    },
    {
      code: 'class C { async m() { throw x } }',
      options: ['allow-throw'],
    },
    {
      code: 'class C { static async m() { throw x } }',
      options: ['allow-throw'],
    },
  ],
  invalid: [
    {
      code: 'async function f() {}',
      errors: [{type: 'FunctionDeclaration', message: MESSAGE}],
    },
    {
      code: '(async function f() {})',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
    {
      code: '(async function() {})',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
    {
      code: 'async () => {}',
      errors: [{type: 'ArrowFunctionExpression', message: MESSAGE}],
    },
    {
      code: 'class C { async m() {} }',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
    {
      code: 'class C { static async m() {} }',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },


    {
      code: 'async function f() { async () => { await x } }',
      errors: [{type: 'FunctionDeclaration', message: MESSAGE}],
    },
    {
      code: '(async function f() { async () => { await x } })',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
    {
      code: '(async function() { async () => { await x } })',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
    {
      code: 'async () => { async () => { await x } }',
      errors: [{type: 'ArrowFunctionExpression', message: MESSAGE}],
    },
    {
      code: 'class C { async m() { async () => { await x } } }',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
    {
      code: 'class C { static async m() { async () => { await x } } }',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },


    {
      code: 'async function f() { await x; async function f() {} }',
      errors: [{type: 'FunctionDeclaration', message: MESSAGE}],
    },
    {
      code: '(async function f() { await x; async function f() {} })',
      errors: [{type: 'FunctionDeclaration', message: MESSAGE}],
    },
    {
      code: '(async function() { await x; async function f() {} })',
      errors: [{type: 'FunctionDeclaration', message: MESSAGE}],
    },
    {
      code: 'async () => { await x; async function f() {} }',
      errors: [{type: 'FunctionDeclaration', message: MESSAGE}],
    },
    {
      code: 'class C { async m() { await x; async function f() {} } }',
      errors: [{type: 'FunctionDeclaration', message: MESSAGE}],
    },
    {
      code: 'class C { static async m() { await x; async function f() {} } }',
      errors: [{type: 'FunctionDeclaration', message: MESSAGE}],
    },


    {
      code: 'async function f() { await x; async () => {} }',
      errors: [{type: 'ArrowFunctionExpression', message: MESSAGE}],
    },
    {
      code: '(async function f() { await x; async () => {} })',
      errors: [{type: 'ArrowFunctionExpression', message: MESSAGE}],
    },
    {
      code: '(async function() { await x; async () => {} })',
      errors: [{type: 'ArrowFunctionExpression', message: MESSAGE}],
    },
    {
      code: 'async () => { await x; async () => {} }',
      errors: [{type: 'ArrowFunctionExpression', message: MESSAGE}],
    },
    {
      code: 'class C { async m() { await x; async () => {} } }',
      errors: [{type: 'ArrowFunctionExpression', message: MESSAGE}],
    },
    {
      code: 'class C { static async m() { await x; async () => {} } }',
      errors: [{type: 'ArrowFunctionExpression', message: MESSAGE}],
    },


    {
      code: 'async function f() { throw x }',
      errors: [{type: 'FunctionDeclaration', message: MESSAGE}],
    },
    {
      code: '(async function f() { throw x })',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
    {
      code: '(async function() { throw x })',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
    {
      code: 'async () => { throw x }',
      errors: [{type: 'ArrowFunctionExpression', message: MESSAGE}],
    },
    {
      code: 'class C { async m() { throw x } }',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
    {
      code: 'class C { static async m() { throw x } }',
      errors: [{type: 'FunctionExpression', message: MESSAGE}],
    },
  ],
});
