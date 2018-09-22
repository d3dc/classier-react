import React from 'react'
import { shallow } from 'enzyme'

import { wrapModule, createModuleElement } from '../src'

// Probably need to make this more complex
const mockedModule = {
  element: 'ocy2n5fe2w',
  'element-modifier-value': 'xxb7hghzte'
}

describe('createModuleElement', () => {
  test('should create an element that renders as class name', () => {
    const Element = createModuleElement('element', mockedModule)
    const wrapper = shallow(<Element modifier="value" />)
    expect(wrapper.prop('className')).toEqual('ocy2n5fe2w xxb7hghzte')
  })
})

describe('wrapModule', () => {
  test('should create an element that renders as class name', () => {
    const NS = wrapModule(mockedModule)
    const wrapper = shallow(<NS.Element modifier="value" />)
    expect(wrapper.prop('className')).toEqual('ocy2n5fe2w xxb7hghzte')
  })
})
