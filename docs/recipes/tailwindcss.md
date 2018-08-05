## Using TailwindCSS with `classier-react`

[TailwindCSS](https://tailwindcss.com) is "a Utility-First CSS Framework
for Rapid UI Development". It comes with a lot of great modular helpers that are very familiar to those coming from Rebass _or_ Bootstrap.

## Setup

These steps assume a structure similar to [`create-react-app`](https://github.com/facebook/create-react-app)
and should closely follow the [installation instruction for TailwindCSS itself](https://tailwindcss.com/docs/installation)

1.  add `tailwindcss` to your project: `yarn add tailwindcss`
2.  create a tailwind configuration: `./node_modules/.bin/tailwind init ./config`
3.  add the tailwind plugin to `post-css`:

```js
{
  loader: require.resolve('postcss-loader'),
  options: {
    ...
    plugins: () => [
      require('tailwindcss')('./config/tailwind.js'),
      ...
    ]
  }
}
```

4.  add the tailwind directives you want to your entry stylesheet:

```css
@tailwind preflight;
@tailwind components;
@tailwind utilities;
```
