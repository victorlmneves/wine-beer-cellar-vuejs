export default {
  state: {
    wineList: [],
    wineListAux: [],
    wineDetails: {}
  },

  getters: {
    wineList: (state) => {
      const wineList = state.wineList

      return wineList
    },

    wineListAux: (state) => {
      const wineListAux = state.wineListAux

      return wineListAux
    },

    wineDetails: (state) => {
      const wineDetails = state.wineDetails

      return wineDetails
    }
  },

  mutations: {
    SET_WINE_LIST(state, wines) {
      localStorage.setItem('wineList', JSON.stringify(wines))
      localStorage.setItem('wineListAux', JSON.stringify(wines))
      state.wineList = wines
    },

    SET_AUX_WINE_LIST(state, wines) {
      localStorage.setItem('wineListAux', JSON.stringify(wines))
      state.wineListAux = wines
    },

    SET_WINE_ITEM(state, wine) {
      localStorage.setItem('wineDetails', JSON.stringify(wine))
      state.wineDetails = wine
    },

    SET_WINE_SORT(state, wines) {
      localStorage.setItem('wineList', JSON.stringify(wines))
      state.wineList = wines
    }
  },

  actions: {
    async getAll({ commit }) {
      const wines = JSON.parse(localStorage.getItem('wineList'))

      if (wines && wines.length !== 0) {
        commit('SET_WINE_LIST', wines)
        commit('SET_AUX_WINE_LIST', wines)

        return
      }

      try {
        console.log('--------', this.$http)
        const response = await this.$http.get('data/wineBeerList.json')
        console.log('then', response)
        const { data } = response

        console.log('data', data)

        commit('SET_WINE_LIST', data)
        commit('SET_AUX_WINE_LIST', data)
      } catch (error) {
        console.log('catch', error)
      }

      // return response.data

      // return this.$http
      //   .get('data/wineBeerList.json')
      //   .then((response) => {
      //     console.log('then', response)
      //     const { data } = response

      //     console.log('data', data)

      //     commit('SET_WINE_LIST', data)
      //     commit('SET_AUX_WINE_LIST', data)
      //   })
      //   .catch((error) => {
      //     console.log('catch', error)
      //     // throw error
      //   })
    },

    async getById({ commit, dispatch, state }, id) {
      console.log('id', id)
      let wines = JSON.parse(localStorage.getItem('wineList'))

      console.log('------- 1 wines -------', wines)

      if (!wines) {
        await dispatch('getAll')
        wines = state.wineList
        console.log('------- 2 wines -------', wines)
      }

      const wine = wines.find(wine => wine.id === Number(id))

      console.log('------- 3 wine -------', wine)

      commit('SET_WINE_ITEM', wine)
    },

    sortBY({ commit }, option) {
      const wines = JSON.parse(localStorage.getItem('wineList'))
      const type = option.split(' ').[0]
      const order = option.split(' ').pop()
      const sortedWines = wines.sort((a, b) => {
        if (type !== 'price') {
          return (order === 'asc') ? a[type].localeCompare(b[type]) : b[type].localeCompare(a[type])
        } else {
          return (order === 'asc') ? a[type] - b[type] : b[type] - a[type]
        }
      })

      commit('SET_WINE_SORT', sortedWines)
    },

    filterBY({ commit }, text) {
      const wines = JSON.parse(localStorage.getItem('wineList'))
      const winesAux = [...wines]

      const wineListAux = winesAux.filter(wine => {
        return wine.name.toLowerCase().includes(text.toLowerCase()) ||
          wine.producer.toLowerCase().includes(text.toLowerCase()) ||
          wine.year.toLowerCase().includes(text.toLowerCase())
      })

      commit('SET_AUX_WINE_LIST', wineListAux)
    }
  }
}
