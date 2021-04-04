import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import WineDetails from '@/components/WineDetails.vue'
import fakeWines from './fakeData/fakeWines'
import store from '@/store/index'

// jest.mock("axios", fakeWines => ({
//   getAll: () => Promise.resolve({ data: fakeWines })
// }))

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock;

// Vue.use(Vuex)

// const getters = {
//   wineDetails: jest.fn(() => (fakeWines[2]))
// }

// const store = new Vuex.Store({
//   getters
// })

// const id = 1
// const getById = jest.fn(() => id)

const options = { style: 'currency', currency: 'EUR' }
const noPrice = jest.fn(() => null)
const price = 33.90
const value = price.toString()
const currency = jest.fn(() => new Intl.NumberFormat('en-US', options).format(value))

const $route = {
  query: {},
  params: { id: 1 }
}

console.log('*************', Vue.prototype)

let wrapper = shallowMount(WineDetails, {
  store,
  // methods: { getById },
  mocks: { $route }
  // filters: { currency }
})

describe('WineDetails.vue', () => {
  // it('can be mounted correctly', () => {
  //   expect(getById).toHaveBeenCalled()
  // })

  it('displays the `N/A` fon the price if no value is passed', () => {
    wrapper = shallowMount(WineDetails, {
      store,
      // methods: { getById },
      mocks: { $route }
      // filters: { noPrice }
    })

    const price = wrapper.find('.wine__price')
    expect(price.text()).toBe('N/A')
  })

  it('displays the item details', () => {
    expect(wrapper.findAll('.wine__item').length).toBe(1)

    const title = wrapper.find('.wine__name')
    expect(title.text()).toBe('Bafarela Reserva - 2018')
  })

  it.only('displays the price formatted correctly', () => {
    wrapper = shallowMount(WineDetails, {
      store,
      // methods: { getById },
      mocks: { $route }
      // filters: { currency }
    })

    const price = wrapper.find('.wine__price')
    expect(price.text()).toBe('€33.90')
  })
})
