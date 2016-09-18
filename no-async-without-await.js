'use strict';

module.exports = context => {
  const stack = [];

  function onFunctionEnter(node) {
    const frame = {
      isAsync: node.async,
      foundYield: false,
    };
    stack.push(frame);
  }

  function onFunctionExit(node) {
    const frame = stack.pop();
    if (frame.isAsync && !frame.foundYield) {
      context.report({
        node,
        message: 'Unnecessary async (only use async when await is needed).',
      });
    }
  }

  return {
    FunctionExpression: onFunctionEnter,
    'FunctionExpression:exit': onFunctionExit,

    FunctionDeclaration: onFunctionEnter,
    'FunctionDeclaration:exit': onFunctionExit,

    ArrowFunctionExpression: onFunctionEnter,
    'ArrowFunctionExpression:exit': onFunctionExit,

    YieldExpression(node) {
      // await nodes are YieldExpression's
      const frame = stack[stack.length - 1];
      frame.foundYield = true;
    },
  };
};

module.exports.schema = [];
