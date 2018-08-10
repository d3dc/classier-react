const { configure, cx } = require('../src')

describe('cx:', () => {
  test('should transform propClasses with booleans', () => {
    const res = cx({
      chicken: true,
      dinner: true
    })

    expect(res).toEqual('chicken dinner')
  })

  test('should transform propClasses with normal values', () => {
    const res = cx({
      chicken: 'dinner',
      sum: 41
    })

    expect(res).toEqual('chicken-dinner sum-41')
  })

  test('should transform propClasses with arrays', () => {
    const res = cx({
      chicken: ['tasty', 'dinner']
    })

    expect(res).toEqual('chicken-tasty chicken-dinner')
  })

  test('should transform propClasses with CamelCase names', () => {
    const res = cx({
      CamelHumps: 'LovelyCamelHumps'
    })

    expect(res).toEqual('Camel-humps-lovely-camel-humps')
  })
})

describe('configure:', () => {
  let configure, cx
  beforeEach(() => {
    jest.resetModules()
    const lib = require('../src')
    cx = lib.cx
    configure = lib.configure
  })

  test('should allow changing value symbol', () => {
    configure({
      join: {
        value: '__'
      }
    })
    const res = cx({
      George: 'Foreman'
    })

    expect(res).toEqual('George__foreman')
  })

  test('should allow changing keepSentence', () => {
    configure({
      keepSentence: false
    })
    const res = cx({
      George: 'Foreman'
    })

    expect(res).toEqual('george-foreman')
  })

  test('should allow changing kebabCase', () => {
    configure({
      kebabCase: false
    })
    const res = cx({
      GrillinMachine: 'LeanMean'
    })

    expect(res).toEqual('GrillinMachine-LeanMean')
  })
})
