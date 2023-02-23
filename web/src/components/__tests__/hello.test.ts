import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Hello from '../HelloWorld.vue'

describe('test', () => {
  test('xxxx', () => {
    expect(1).toBe(1)
  })

  test('displays message', () => {
    // mount() returns a wrapped Vue component we can interact with
    const wrapper = mount(Hello, {
      propsData: {
        msg: 'Hello world',
      },
    })

    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('Hello world')
  })
})
