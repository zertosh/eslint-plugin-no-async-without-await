'use strict';

module.exports = context => {
  const allowThrow = context.options[0] === 'allow-throw';
  const stack = [];

  function onFunctionEnter(node) {
    const frame = {
      isAsync: node.async,
      foundThrow: false,
      foundYield: false,
      foundAwait: false,
    };
    stack.push(frame);
  }

  function onFunctionExit(node) {
    const frame = stack.pop();
    if (
      frame.isAsync &&
      !(frame.foundAwait || frame.foundYield || (allowThrow && frame.foundThrow))
    ) {
      context.report({
        node,
        message: 'Unnecessary async (only use async when await is needed).',
      });
    }
  }

  return {
    Program: onFunctionEnter,
    'Program:exit': onFunctionExit,

    FunctionExpression: onFunctionEnter,
    'FunctionExpression:exit': onFunctionExit,

    FunctionDeclaration: onFunctionEnter,
    'FunctionDeclaration:exit': onFunctionExit,

    ArrowFunctionExpression: onFunctionEnter,
    'ArrowFunctionExpression:exit': onFunctionExit,

    ThrowStatement(node) {
      const frame = stack[stack.length - 1];
      frame.foundThrow = true;
    },

    YieldExpression(node) {
      // await nodes are YieldExpression's with babel-eslint < 7.0.0
      const frame = stack[stack.length - 1];
      frame.foundYield = true;
    },

    AwaitExpression(node) {
      const frame = stack[stack.length - 1];
      frame.foundAwait = true;
    },

    ForAwaitStatement(node) {
      const frame = stack[stack.length - 1];
      frame.foundAwait = true;
    },
  };
};

module.exports.schema = [
  {
    enum: ['allow-throw'],
  },
];
