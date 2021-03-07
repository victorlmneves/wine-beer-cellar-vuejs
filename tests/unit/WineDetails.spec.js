import Vue from 'vue'
// import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import WineDetails from '@/components/WineDetails.vue'
// import mockAxios from 'axios'
import fakeWines from './fakeData/fakeWines'

// Vue.use(VueRouter)
Vue.use(Vuex)

const getters = {
  wineDetails: jest.fn(() => (fakeWines[2]))
}

const store = new Vuex.Store({
  getters
})

const id = 1
const getById = jest.fn(() => id)

const $route = {
  query: {},
  params: { id: 1 }
}

const wrapper = shallowMount(WineDetails, {
  store,
  methods: { getById },
  mocks: { $route }
})

describe('WineDetails.vue', () => {
  it('can be mounted correctly', () => {
    expect(getById).toHaveBeenCalled()
  })

  it('displays the item details', () => {
    expect(wrapper.findAll('.wine__item').length).toBe(1)

    const title = wrapper.find('.wine__name')
    expect(title.text()).toBe('Bafarela Reserva - 2018')
  })
})
