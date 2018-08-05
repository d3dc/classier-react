const { mapToNamespace, createBlock } = require('../src')

test('mapToNamespace', () => {
  const res = mapToNamespace('wakka', {
    chicken: 'dinner',
    sum: 41
  })

  expect(res).toEqual({
    wakka: true,
    'wakka-chicken': 'dinner',
    'wakka-sum': 41
  })
})

describe('createBlock', () => {
  test('should have __classier', () => {
    const ns = createBlock('NSWeAreTesting')
    expect(ns).toHaveProperty('__classier', 'ns-we-are-testing')
  })

  test('should proxy to factory', () => {
    const ns = createBlock('NS')
    expect(ns.TestEl).toHaveProperty('__classier', 'ns-test-el')
  })

  xtest('should render root', () => {
    const NS = createBlock('NS')
    expect(<NS sum={41} />).toMatchSnapshot()
  })

  xtest('should render proxy', () => {
    const NS = createBlock('NS')
    expect(<NS.TestEl chicken="dinner" />).toMatchSnapshot()
  })
})
