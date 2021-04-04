import Vue from 'vue'
import VueRouter from 'vue-router'
import { shallowMount } from '@vue/test-utils'
import WineItem from '@/components/WineItem.vue'
import fakeWines from './fakeData/fakeWines'

Vue.use(VueRouter)

describe('WineItem.vue', () => {
  const wrapper = shallowMount(WineItem, {
    propsData: {
      wineList: fakeWines
    }
  })

  it('can be mounted correctly', () => {
    expect(wrapper.find('.wine-list__item').exists()).toBe(true)
  })

  it('displays 6 items', () => {
    expect(wrapper.findAll('.wine-list__item').length).toBe(6)
  })

  it('the first item displays the correct name', () => {
    const title = wrapper.find('.wine-list__name')
    expect(title.text()).toBe('Magnum Quinta da Leda Tinto 1.5L')
  })
})
