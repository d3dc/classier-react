import React from 'react'
import { shallow } from 'enzyme'

import { Text, Box, Comp, createElement } from '../src'

describe('Text:', () => {
  test('should render with class name', () => {
    const wrapper = shallow(<Text propsTest children={'test'} />)
    expect(wrapper.prop('className')).toEqual('props-test')
    expect(wrapper.text()).toBe('test')
  })

  test('should render with prop values in class names', () => {
    const wrapper = shallow(<Text text="red" py={5} children={'test'} />)
    expect(wrapper.prop('className')).toEqual('text-red py-5')
    expect(wrapper.text()).toBe('test')
  })
})

describe('Box:', () => {
  test('should render with class name', () => {
    const wrapper = shallow(<Box propsTest />)
    expect(wrapper.prop('className')).toEqual('props-test')
  })

  test('should render as header with class name', () => {
    const wrapper = shallow(<Box is="h1" propsTest />)
    expect(wrapper.prop('className')).toEqual('props-test')
    expect(wrapper.type()).toBe('h1')
  })

  test('should render with prop values in class names', () => {
    const wrapper = shallow(<Box text="red" py={5} />)
    expect(wrapper.prop('className')).toEqual('text-red py-5')
  })

  test('should ignore onClick', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<Box text="red" onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick.mock.calls.length).toBe(1)
    expect(wrapper.prop('className')).toEqual('text-red')
  })
})

describe('Comp:', () => {
  test('should add parametric class names', () => {
    const wrapper = shallow(<Comp text="red" py={5} children={<div />} />)
    expect(wrapper.prop('className')).toEqual('text-red py-5')
    expect(wrapper.type()).toBe('div')
  })

  test('should merge classNames', () => {
    const wrapper = shallow(
      <Comp propsTest children={<div className="inner-test" />} />
    )
    expect(wrapper.type()).toBe('div')
    expect(wrapper.prop('className')).toEqual('props-test inner-test')
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

describe('createElement', () => {
  test('should create an element that renders with class name', () => {
    const Tester = createElement('tester')
    const wrapper = shallow(<Tester propsTest />)
    expect(wrapper.prop('className')).toEqual('tester tester-props-test')
  })

  test('should create an element that composes with class name', () => {
    const Tester = createElement('tester')
    const wrapper = shallow(
      <Tester.Comp propsTest>
        <div className="inner-test" />
      </Tester.Comp>
    )
    expect(wrapper.prop('className')).toEqual(
      'tester tester-props-test inner-test'
    )
  })
})
