# :rotating_light: DEPRECATED :rotating_light:

This project is deprecated. ESLint introduced a comparable rule to this one in ESLint 3.11.0: https://eslint.org/docs/rules/require-await

# eslint-plugin-no-async-without-await

[![Build Status](https://travis-ci.org/zertosh/eslint-plugin-no-async-without-await.svg?branch=master)](https://travis-ci.org/zertosh/eslint-plugin-no-async-without-await)

## Usage

```sh
npm install eslint-plugin-no-async-without-await
```

In your `.eslintrc`:

```json
{
  "plugins": [
    "no-async-without-await"
  ],
  "rules": {
    "no-async-without-await/no-async-without-await": 1
  }
}
```

## Rule Details

Examples of **incorrect** code for this rule:

```js
async function f() {
  return true;
}

class C {
  async m() {
    return 2 + 2;
  }
}
```

Examples of **correct** code for this rule:

```js
async function f() {
  await ;
  return true;
}

class C {
  async m() {
    await someAsyncProcess();
    return 2 + 2;
  }
}

function f() {
  return someAsyncProcess();
}
```

## Options

* `allowThrow`: Allows `throw` to substitute for `await`. It's often convenient for an `async` function simply throw to return a rejected promise.
