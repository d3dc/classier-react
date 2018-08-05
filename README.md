# 🎩 Classier React 🥂
![npm (tag)](https://img.shields.io/npm/v/classier-react.svg)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/classier-react.svg)
![npm](https://img.shields.io/npm/l/classier-react.svg)



We keep putting styles in Javascript. We've developed these rather awesome and complex toolchains to have tools like [Rebass](jxnblk/rebass). But most browser apps don't need an alternative to CSS, and without it, styles aren't re-used and they don't _cascade_!

Awesome style libraries already exist for browsers, its just awkward to make use of them when you're writing react. Cramming everything into that `className` string feels wrong.

`classier-react` solves the problem by simply translating from props to CSS classes. Its not generating code and its not pushing the browser to its limits.

```jsx
const Button = props =>
  <Box rounded bg="blue" py={2} px={4} {...props} is='button' />
```

Think of it like weaponized `classnames`.

## Install

```
npm install classier-react
```

## Getting started

You'll have to have configured your build toolchain with a style loader and have added some styles to use the tool. This usually isn't very much setup. 

See the [TailwindCSS Recipe](docs/recipes/tailwindcss.md) for an example configuration thats one of the more complicated.


## Usage

You'll define your presentational components using whatever style architecture you choose. This example uses utility classes from [TailwindCSS](https://tailwindcss.com/docs/):

```jsx
import { Box, Comp } from 'classier-react'

const Card = props => (
  <Box rounded shadow="lg" maxW="sm" overflow="hidden" {...props} />
)

const CardHeroImage = ({ src, ...rest }) => (
  <Comp w="full" border={['black', 'solid']} {...rest}>
    <img src={src} />
  </Comp>
)

const CardTitle = ({ size = 5, ...rest }) => (
  <Box is={'h' + size} text="xl" font="bold" mb={2} {...rest} />
)

const CardBody = props => <Box px={6} py={4} {...props} />
```

And to consume your components:

```jsx
<Card maxW="md">
  <CardHeroImage src={image} border={false} />
  <CardTitle>So Classy</CardTitle>
  <CardBody>Lorem ipsum...</CardBody>
</Card>
```

## Translation to style names

Under the hood, `classier-react` assumes any unknown props are declared as modifiers in your stylesheet. Props are translated to these declarations according to simple rules:

- Any props with an explicit `false` value are omitted

- prop values are appended to their names
   - each value of an array will generate its own prop class

- camelCase words become kebab-cased

- Sentence-casing is preserved but not added


## Passing down styles

`<Comp />` only injects the props it merges, it can't make sure they are rendered. If you're wrapping or writing a component, it's a good idea to pass any props you don't use onward to what is rendered.

Most components are already written this way.

```jsx
const MyComponent = ({ option, ...rest }) => <div {...rest} />
```

## CSS Modules

`classier-react` supports using CSS Modules through dynamic object keys:

```jsx
import styles from './styles.css'

<Box {...{
  [styles.fontSize]: 'md'
}} {...rest} />
```

## API

```js
import { Box, Comp, cx, configure } from 'classier-react'
```

---

### `<Box />`

Renders a tag with its unknown props translated to CSS classes.

#### props

- **is**: the tag to render as (_default: 'div'_)


---

### `<Comp />`

A _HOC_ for injecting or "composing" style props. Merges its `style`, `className`, and the rest of its props as classes into the props of a child component.


---

### `cx(props, ...extraClasses)`

Transform the passed props into a className string. Called by Box and Comp.


---

### `configure(opts)`

Lets you change the global behavior of `cx`

#### opts

- **transformCase** - enables lower-casing everything but the first word (_default: true_)

- **join.words** - the string to insert between the words in a camelCase identifier (_default: '-'_)

- **join.modifiers** - the string to insert between a prop name and its modifiers (_default: '-'_)
