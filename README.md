# Classier React

We keep putting styles in Javascript. We've developed this rather complex toolchain to create tools like [Rebass](jxnblk/rebass). In the end, styles aren't re-used and they don't _cascade_!

Awesome style libraries already exist, its just awkward to make use of them when you're writing react. Cramming everything into that `className` string feels wrong.

Classier React solves the problem by simply translating from props to CSS classes. Its not generating code and its not pushing the browser to its limits.

Think of it like weaponized `classnames`.

## Install

```
npm install classier-react
```

## Usage

You'll have to have configured your build-toolchain with a style loader and have added some styles.

Here's the basic usage with utility classes from [TailwindCSS](https://tailwindcss.com/)

```jsx
import { Box, Comp } from 'classier-react'

const Card = props => (
  <Box rounded shadow="lg" maxW="sm" overflow="hidden" {...props} />
)

const CardHeroImage = props => (
  <Comp w="full" border={['black', 'solid']}>
    <img {...props} />
  </Comp>
)

const CardTitle = ({ size = 5, ...rest }) => (
  <Box is={'h' + size} font="bold" text="xl" mb={2} {...rest} />
)

const CardBody = props => <Box px={6} py={4} {...props} />
```

## Getting started

See the [TailwindCSS Recipe](docs/recipes/tailwind) for an example configuration.

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

### `<Box />`

Renders a tag with its unknown props translated to CSS classes.

#### props

- **is**: the tag to render as (_default: 'div'_)

### `<Comp />`

A _HOC_ for injecting or "composing" style props. Merges its `style`, `className`, and the rest of its props as classes into the props of a child component.
