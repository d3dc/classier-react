## Using Pug with `classier-react`

[Pug](https://pugjs.org) is a concise, declarative, language for writing content.

Sometimes you want to combine custom styling and layout in your content. `classier-react` allows you keep Pug's clean style by moving long chains of classes to attributes, as well as create re-usable layout blocks from just `css` alone.

### Setup

These steps show webpack setup using [pug-as-jsx-loader](https://github.com/bluewings/pug-as-jsx-loader)

For webpack this is just:

1. install

```sh
npm i pug-as-jsx-loader
```

2. (WIP) add `classier-react` as a module transform in your style loader.

3. add a rule for pug files that resolves Box, Comp, and Text to `classier-react` (WIP: individual imports)

```js
{
 test: /\.pug$/,
 use: [ 'babel-loader', {
  loader: 'pug-as-jsx-loader',
  options: {
    resolveComponents: {
      Box: 'classier-react/Box',
      Comp: 'classier-react/Comp',
      Text: 'classier-react/Text'
    },
  },
 }]
}
```


### Example

```pug
// @import menu.css => Menu

Comp(w='auto' shadow='lg'): Menu(bg='dark')
  Menu.Item(active)| dogs
  Menu.Item| cats
```
