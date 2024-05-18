import { RuleTester } from 'eslint'
import rule from './extract-exception'

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })
tester.run('require-throws-exception', rule, {
  valid: [
    {
      code: `
      /**
       * This is the Foo function.
       * @throws {Error}
       */
      function foo() {
        throw new Error('Something went wrong.')
      }
    `,
    },
  ],
  invalid: [
    {
      code: `
        function foo() {
          /* here is the comment. */
          throw new Error('Something went wrong.')
        }
      `,
      errors: [{ message: 'Throw statement found within a function.' }],
    },
  ],
})
