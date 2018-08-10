const { Box, Comp } = require('../src')

describe('Box:', () => {
  xtest('should render with class name', () => {
    // expect(render(<Box testClass />)).toMatch(snapshot)
  })

  xtest('should render as span with class name', () => {
    // expect(render(<Box is='span' testClass />)).toMatch(snapshot)
  })

  xtest('should render with prop values in class names', () => {
    // expect(render(<Box text='red' py={5} />)).toMatch(snapshot)
  })

  xtest('should ignore onClick', () => {
    // const fn = mock(() => ())
    // expect(render(<Box clickMe text='red' onClick={fn} />).click('click-me')).toMatch(snapshot)
    // expect(fn).toHaveBeenCalled().once()
  })
})

describe('Comp:', () => {
  xtest('should render with class name', () => {
    // expect(render(<Comp testClass children={<div />} />)).toMatch(snapshot)
  })

  xtest('should render with parametric class names', () => {
    // expect(render(<Comp text='red' py={5} children={<div />} />)).toMatch(snapshot)
  })

  xtest('should inject style', () => {
    // expect(render(<Comp style={{ color: 'red' }} children={<div />} />)).toMatch(snapshot)
  })
})
