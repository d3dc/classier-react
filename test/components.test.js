import React from 'react'
import { shallow } from 'enzyme'

import { Box, Comp } from '../src'

describe('Box:', () => {
  test('should render with class name', () => {
    const wrapper = shallow(<Box passTest />)
    expect(wrapper.hasClass('pass-test')).toBe(true)
  })

  test('should render as span with class name', () => {
    const wrapper = shallow(<Box is="span" passTest />)
    expect(wrapper.hasClass('pass-test')).toBe(true)
    expect(wrapper.type()).toBe('span')
  })

  test('should render with prop values in class names', () => {
    const wrapper = shallow(<Box text="red" py={5} />)
    expect(wrapper.hasClass('text-red')).toBe(true)
    expect(wrapper.hasClass('py-5')).toBe(true)
  })

  test('should ignore onClick', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<Box text="red" onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick.mock.calls.length).toBe(1)
  })
})

describe('Comp:', () => {
  test('should add parametric class names', () => {
    const wrapper = shallow(<Comp text="red" py={5} children={<div />} />)
    expect(wrapper.type()).toBe('div')
    expect(wrapper.hasClass('text-red')).toBe(true)
    expect(wrapper.hasClass('py-5')).toBe(true)
  })

  test('should merge classNames', () => {
    const wrapper = shallow(
      <Comp passTest children={<div className="inner-test" />} />
    )
    expect(wrapper.type()).toBe('div')
    expect(wrapper.hasClass('inner-test')).toBe(true)
    expect(wrapper.hasClass('pass-test')).toBe(true)
  })

  test('should merge style', () => {
    const wrapper = shallow(
      <Comp
        style={{ color: 'red' }}
        children={<div style={{ background: 'blue' }} />}
      />
    )
    expect(wrapper.type()).toBe('div')
    expect(wrapper.prop('style')).toEqual({ color: 'red', background: 'blue' })
  })
})
