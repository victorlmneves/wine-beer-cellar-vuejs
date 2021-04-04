import Vue from 'vue'
import VueRouter from 'vue-router'
import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

Vue.use(VueRouter)

describe('Header.vue', () => {
  it('renders `Wine List` title', () => {
    const wrapper = shallowMount(Header, {
      propsData: {
          title: 'Wine List'
        }
    })
    const title = wrapper.find('.header__title')
    expect(title.text()).toBe('Wine List')
  })
})
