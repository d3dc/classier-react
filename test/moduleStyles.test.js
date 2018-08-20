import React from 'react'
import { shallow } from 'enzyme'

import { boxedModule, elementModule } from '../src'

// Probably need to make this more complex
const mockedModule = {
  element: 'ocy2n5fe2w',
  'element-modifier-value': 'xxb7hghzte'
}

describe('boxedModule', () => {
  test('should create an element that maps to module', () => {
    const NSBox = boxedModule(mockedModule)
    const wrapper = shallow(<NSBox elementModifier="value" />)
    expect(wrapper.prop('className')).toEqual('xxb7hghzte')
  })
})

describe('elementModule', () => {
  test('should create an object with an element that maps to module with a base block', () => {
    const NS = elementModule(mockedModule, ['element'])
    const wrapper = shallow(<NS.Element modifier="value" />)
    expect(wrapper.prop('className')).toEqual('ocy2n5fe2w xxb7hghzte')
  })
})
