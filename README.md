# babel-plugin-implicit-function

This plugin is made to make JS syntax easier to work with functional programming by creating
quoted expressions that may be lazily evaluated and work together with functional libraries,
like Ramda. I've overloaded the `~` prefix unary operator for that.

## Examples

```javascript
import { cond } from 'ramda';

const precomputedResult = ~(10 === 20);
const otherwise = ~true;
const matches = cond([
    [precomputedResult, ~'Something is reeeeally wrong!'],
    [otherwise, ~'Nice! Math still works!']
]);
```

Turn into

```javascript
import { cond } from 'ramda';

const precomputedResult = () => 10 === 20;
const otherwise = () => true;
const matches = cond([
    [precomputedResult, () => 'Something is reeeeally wrong!'],
    [otherwise, () => 'Nice! Math still works!']
]);
```

This is a good replacement for `always` function, because this is really lazy, and the value
only gets computed when you need it. Using `always` can cause problems by premature evaluation:

```javascript
getUsers()
    .then(always(doSomethingImportantAndReturn());
```

Note that `doSomethingImportantAndReturn` needs `getUsers` to be computed before, but that's
not what happen, and this is a source of error and code smell. We could easily fix that with
`~` operator. Remember: **never** use `always`!

```javascript
getUsers()
    .then(~doSomethingImportantAndReturn());
```


## Disabling in current scope

If you want to use the original bitwise negation operator, you can disable this plugin in
current scope (and it children scopes) using `'no implicit function` directive.

## Installation

```sh
$ npm install --save-dev babel-plugin-implicit-function
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["implicit-function"]
}
```

### Via CLI

```sh
$ babel --plugins implicit-function script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['implicit-function']
});
```

# License

MIT
