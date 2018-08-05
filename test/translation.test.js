const { cx } = require('../src')

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

    expect(res).toEqual('camel-humps-lovely-camel-humps')
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

  test('should allow changing value joiner', () => {
    configure({
      join: {
        value: '__'
      }
    })
    const res = cx({
      George: 'Foreman'
    })

    expect(res).toEqual('george__foreman')
  })

  test('should allow changing modifier joiner', () => {
    const { mapToNamespace } = require('../src')
    configure({
      join: {
        modifier: '__'
      }
    })
    const res = mapToNamespace('Mr', {
      George: 'Foreman'
    })

    expect(res).toHaveProperty('Mr__George')
  })

  test('should allow changing block joiner', () => {
    const { createBlock } = require('../src')
    configure({
      join: {
        block: '__'
      }
    })
    const MFG = createBlock('BlackAndDecker')

    expect(MFG.GeorgeForeman.__classier).toEqual(
      'black-and-decker__george-foreman'
    )
  })

  test('should allow changing transformCase', () => {
    configure({
      transformCase: false
    })
    const res = cx({
      George: 'Foreman'
    })

    expect(res).toEqual('George-Foreman')
  })
})
