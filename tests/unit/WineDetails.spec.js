// import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import WineDetails from '@/components/WineDetails.vue'
import fakeWines from './fakeData/fakeWines'
// import { actions } from '@/store/modules/wine.js'
// import store from '@/store/index'

const localVue = createLocalVue()
localVue.use(Vuex)

// jest.mock("axios", fakeWines => ({
//   getAll: () => Promise.resolve({ data: fakeWines })
// }))

// class LocalStorageMock {
//   constructor() {
//     this.store = {}
//   }

//   clear() {
//     this.store = {}
//   }

//   getItem(key) {
//     return this.store[key] || null
//   }

//   setItem(key, value) {
//     this.store[key] = String(value)
//   }

//   removeItem(key) {
//     delete this.store[key]
//   }
// }

// global.localStorage = new LocalStorageMock;

// Vue.use(Vuex)

let wrapper = null

let getters = {
  wineDetails: () => fakeWines[2]
}

let actions = {
  getById: jest.fn(() => 2)
}

const $route = {
  params: {
    id: 2
  }
}

const mocks = {
  $route
}

let store = new Vuex.Store({
  getters,
  actions
})

beforeEach(() => {
  wrapper = shallowMount(WineDetails, {
    store,
    localVue,
    mocks
  })
})

afterEach(() => {
  wrapper.destroy()
})

const options = { style: 'currency', currency: 'EUR' }
const unformattedPrice = 33.90
const value = unformattedPrice.toString()
const currency = jest.fn(() => new Intl.NumberFormat('en-US', options).format(value))

describe('WineDetails.vue', () => {
  it('can be mounted correctly', async () => {
    expect(wrapper.element).toMatchSnapshot()
    expect(actions.getById).toHaveBeenCalled()
  })

  it('displays the `N/A` on the price if no value is passed', () => {
    const price = wrapper.find('.wine__price')
    expect(price.text()).toBe('N/A')
  })

  it('displays the item details', () => {
    expect(wrapper.findAll('.wine__item').length).toBe(1)

    const title = wrapper.find('.wine__name')
    expect(title.text()).toBe('Bafarela Reserva - 2018')
  })

  it('displays the price formatted correctly', () => {
    getters = {
      wineDetails: () => fakeWines[1]
    }
    
    actions = {
      getById: jest.fn(() => 1)
    }

    store = new Vuex.Store({
      getters,
      actions
    })

    wrapper = shallowMount(WineDetails, {
      store,
      localVue,
      mocks
    })

    const price = wrapper.find('.wine__price')
    expect(price.text()).toBe('€27.50')
  })
})
