# 🎩 Classier React 🥂

![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/classier-react.svg)
![npm (tag)](https://img.shields.io/npm/v/classier-react.svg)
[![Build Status](https://travis-ci.com/d3dc/classier-react.svg?branch=master)](https://travis-ci.com/d3dc/classier-react)
![npm](https://img.shields.io/npm/l/classier-react.svg)

`classier-react` automatically lets you access your stylesheet utilty classes as props on [Box](#box-) and can generate react components for the elements in your CSS modules.

```jsx
const Button = props => (
  <Box rounded bg="blue" py={2} px={4} {...props} is="button" />
)
```

We know awesome stylesheets are out there for browsers, its just awkward to make use of them when working with JSX. Cramming everything into that `className` string feels wrong and our brains have to remember how the styles were written.

`classier-react` solves the problem by simply translating from props to CSS classes. Its not generating code and its not pushing the browser to its limits.

Think of it like `classnames` with superpowers.

## Install

```
npm install classier-react
```

## Getting started

You'll have to have configured your app with a stylesheet to use the tool. Webpack can have a style loader or you might even include your favorite library straight in the `<head>` tag.

See the [TailwindCSS Recipe](docs/recipes/tailwindcss.md) to add the classes used in the examples to a `create-react-app` app.

## Usage

_Note: This example uses utility classes from [TailwindCSS](https://tailwindcss.com/docs/)._

You'll define your presentational components:

```jsx
import { Box, Comp } from 'classier-react'

const Card = props => (
  <Box
    rounded
    shadow={['md', { hover: 'lg' }]}
    maxW="sm"
    overflow="hidden"
    {...props}
  />
)

const CardHeroImage = ({ src, ...rest }) => (
  <Comp w="full" border={[1, 'black']} {...rest}>
    <img src={src} />
  </Comp>
)

const CardTitle = ({ size = 5, ...rest }) => (
  <Box is={'h' + size} text="xl" font="bold" mb={2} {...rest} />
)

const CardBody = props => <Box px={6} py={4} {...props} />
```

And then consume them as usual:

```jsx
<Card maxW="md">
  <CardHeroImage src={image} border={false} />
  <CardTitle size={4}>So Classy</CardTitle>
  <CardBody font="semibold">Lorem ipsum...</CardBody>
</Card>
```

## Translation to style names

Under the hood, `classier-react` assumes any unknown props are declared as modifiers in your stylesheet. Props are translated to these declarations according to simple rules:

- Any props with an explicit `false` value are omitted

- prop values are appended to their names

  - each value of an array will generate its own prop class

  - each key of an object will generate a variant prop class

- camelCase words become kebab-cased

- Sentence-casing is preserved but not added

## Passing down styles

`<Comp />` only injects the props it merges, it can't make sure they are rendered. If you're wrapping or writing a component, you'll want to to pass any props you don't use or specifically ignore onward to what is rendered.

An unsafe, but easy, way to this is to make use of the spread operator:

```jsx
const MyComponent = ({ option, ...rest }) => <Box {...rest} />
```

## CSS Modules

`classier-react` can wrap CSS Modules with `elementModule` and `boxedModule`.

`boxedModule` creates an Element that checks the provided module for a mapping after transformation:

```jsx
import { createModuleElement } from 'classier-react'
import styles from './styles.css'

const MBox = boxedModule(styles)

...

<MBox someProp='someValue' children={...} />
```

`elementModule` will expose the optionally listed blocks as Elements from the module:

```jsx
import { createModuleElement } from 'classier-react'
import styles from './styles.css'

const Block = elementModule(styles, ['element'])


...

<Block.Element fontSize="md" {...props} />
```

## Passing down styles

`<Comp />` only injects the props it merges, it can't make sure they are rendered. If you're wrapping or writing a component, it's a good idea to pass the `style` and `className` props onward to what is rendered.

Most components are already written this way.

```jsx
const MyComponent = ({ option, ...rest }) => <div {...rest} />
```

## Avoiding mixing domains

You can also use `cx` and pass around the resulting string yourself:

```js
import { cx } from 'classier-react'

...

const containerClassName = cx(props.styled)
```

## API

### React

```js
import { Box, Text, Comp, createElement } from 'classier-react'
```

---

### `<Box />`

Renders a tag with its unknown props translated to CSS classes.

#### props

- **is**: the tag to render as (_default: 'div'_)

---

### `<Text />`

Renders a span with all its props translated to CSS classes.

---

### `<Comp />`

A declarative wrapper for injecting or "composing" style props. Merges its `style`, `className`, and the rest of its props as classes into the props of a child component.

---

### `createElement(name)`

Returns a customized `Box` that nests its CSS classes under the {name} block.

#### members

- **Comp** - a `Comp` with the same customization.

---

### CSS Modules

```js
import { boxedModule, createModuleElement, elementModule } from 'classier-react'
```

---

### `boxedModule(module)`

Returns an `Element` that tries to map its CSS classes to the ones in the provided module.

---

### `createModuleElement(module, name)`

Returns an `Element` that tries to map its CSS classes to the ones in the provided module under the {name} block.

---

### `elementModule(module, pick)`

Returns an object that picks selectors of `module` to `createModuleElement`.

---

### Utility

```js
import { cx, configure } from 'classier-react'
```

---

### `cx(props, ...extraClasses)`

Transform the passed props into a className string. Called by Box and Comp.

---

### `configure(opts)`

Lets you change the global behavior of `cx`

#### opts

- **transformFn** - A function mapping an AST Node to a CSS class name. (_default: mappers.tailwind_)

- **kebabCase** - Transform names and values from camelCase. You might want to turn it off with `postcss-modules`. (_default: true_)

- **keepSentence** - When kebabing, lower-case everything but the first word (_default: true_)

- **join.words** - the string to insert between the words in a camelCase identifier (_default: '-'_)

- **join.value** - the string used to separate a value (_default: '-'_)

- **join.variant** - the string used to separate a variant from its modifier(_default: ':'_)

- **join.block** - the string to insert before nested blocks or elements (_default: '-'_)

- **join.modifier** - the string used to separate the block identifier from the modifier name (_default: '-'_)
