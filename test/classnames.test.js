import { classnames, classnamesWithBase } from '../src'

describe('classnames:', () => {
  test('should transform propClasses with booleans', () => {
    const res = classnames({
      chicken: true,
      dinner: true
    })

    expect(res).toEqual('chicken dinner')
  })

  test('should transform propClasses with normal values', () => {
    const res = classnames({
      chicken: 'dinner',
      sum: 41
    })

    expect(res).toEqual('chicken-dinner sum-41')
  })

  test('should transform propClasses with arrays', () => {
    const res = classnames({
      chicken: ['tasty', 'dinner']
    })

    expect(res).toEqual('chicken-tasty chicken-dinner')
  })

  test('should transform propClasses with variants', () => {
    const res = classnames({
      chicken: ['dinner', { morning: 'breakfast' }]
    })

    expect(res).toEqual('chicken-dinner morning:chicken-breakfast')
  })

  test('should transform propClasses with CamelCase names', () => {
    const res = classnames({
      CamelHumps: 'LovelyCamelHumps'
    })

    expect(res).toEqual('Camel-humps-lovely-camel-humps')
  })

  test('classnamesWithBase', () => {
    const res = classnamesWithBase({ block: 'wakka' })({
      chicken: 'dinner',
      sum: 41
    })

    expect(res).toEqual('wakka wakka-chicken-dinner wakka-sum-41')
  })
})

describe('configure:', () => {
  let configure, classnames
  beforeEach(() => {
    jest.resetModules()
    const lib = require('../src')
    classnames = lib.classnames
    configure = lib.configure
  })

  test('should allow changing value symbol', () => {
    configure({
      join: {
        value: '__'
      }
    })
    const res = classnames({
      George: 'Foreman'
    })

    expect(res).toEqual('George__foreman')
  })

  test('should allow changing keepSentence', () => {
    configure({
      keepSentence: false
    })
    const res = classnames({
      George: 'Foreman'
    })

    expect(res).toEqual('george-foreman')
  })

  test('should allow changing kebabCase', () => {
    configure({
      kebabCase: false
    })
    const res = classnames({
      GrillinMachine: 'LeanMean'
    })

    expect(res).toEqual('GrillinMachine-LeanMean')
  })
})
