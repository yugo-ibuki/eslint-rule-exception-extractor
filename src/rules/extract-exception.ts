import { Rule } from 'eslint'
import { BaseFunction, Node } from 'estree'
import estraverse from 'estraverse'

const throwStatement = '@throws'

const rule: Rule.RuleModule = {
  create: (context) => {
    return {
      ':function': (node: Node) => {
        // check if the function has a throw statement
        const hasThrowStatement = context.sourceCode
          .getJSDocComment(node)
          ?.value.includes(throwStatement)

        // If there is no throw statement, return
        estraverse.traverse(node, {
          enter(childNode) {
            // If there is a throw statement and there is no throw statement,
            // report an error
            if (childNode.type === 'ThrowStatement' && !hasThrowStatement) {
              context.report({
                node: childNode,
                message: 'Throw statement found within a function.',
              })
            }
          },
        })
      },
    }
  },
}

export = rule
