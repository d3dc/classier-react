const { Box, Comp } = require('../src')

describe('Box:', () => {
  test('should render with class name', () => {
    // expect(render(<Box testClass />)).toMatch(snapshot)
  })

  test('should render as span with class name', () => {
    // expect(render(<Box is='span' testClass />)).toMatch(snapshot)
  })

  test('should render with parametric class names', () => {
    // expect(render(<Box text='red' py={5} />)).toMatch(snapshot)
  })

  test('should ignore onClick', () => {
    // const fn = mock(() => ())
    // expect(render(<Box clickMe text='red' onClick={fn} />).click('click-me')).toMatch(snapshot)
    // expect(fn).toHaveBeenCalled().once()
  })
})

describe('Comp:', () => {
  test('should render with class name', () => {
    // expect(render(<Comp testClass children={<div />} />)).toMatch(snapshot)
  })

  test('should render with parametric class names', () => {
    // expect(render(<Comp text='red' py={5} children={<div />} />)).toMatch(snapshot)
  })

  test('should inject style', () => {
    // expect(render(<Comp style={{ color: 'red' }} children={<div />} />)).toMatch(snapshot)
  })
})
