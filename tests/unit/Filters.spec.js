import Vue from 'vue'
import VueRouter from 'vue-router'
import { shallowMount } from '@vue/test-utils'
import Filters from '@/components/Filters.vue'

Vue.use(VueRouter)

describe('Header.vue', () => {
  const wrapper = shallowMount(Filters)

  it('can be mounted correctly', () => {
    expect(wrapper.find('.filters').exists()).toBe(true)
  })

  it('has 3 menus', () => {
    expect(wrapper.findAll('.filters__wrap').length).toBe(3)
  })

  it('has the `Add Item` link', () => {
    expect(wrapper.find('.filters__add-item').exists()).toBe(true)
  })

  it('has the `Search` input', () => {
    expect(wrapper.find('.filters__search').exists()).toBe(true)
  })

  it('has the `Sort` dropdown', () => {
    expect(wrapper.find('.filters__select').exists()).toBe(true)
  })
})
