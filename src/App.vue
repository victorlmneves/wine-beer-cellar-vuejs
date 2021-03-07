<template>
  <div id="app">
    <Header title="Wine List" />
    <Filters v-if="showFilters" />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Filters from './components/Filters.vue'

export default {
  name: 'App',

  components: {
    Header,
    Filters
  },

  computed: {
    showFilters() {
      return this.$route.name === 'home'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
