import { Rule } from 'eslint'
import { Node } from 'estree'

const throwStatement = '@throws'

const rule: Rule.RuleModule = {
  create: (context) => {
    function traverse(node: Node) {
      if (node.type === 'ThrowStatement') {
        context.report({
          node: node,
          message: 'Throw statement found within a function.',
        })
      }

      if (
        node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression'
      ) {
        // check if the function has a throw statement
        const hasThrowStatement = context.sourceCode
          .getJSDocComment(node)
          ?.value.includes(throwStatement)

        // If there is no throw statement, do nothing
        if (!hasThrowStatement) {
          // If there is a throw statement and there is no throw statement,
          // report an error
          if (node.body.type === 'BlockStatement') {
            node.body.body.forEach(traverse)
          }
        }
      }
    }

    return {
      ':function': (node: Node) => {
        traverse(node)
      },
    }
  },
}

export = rule
