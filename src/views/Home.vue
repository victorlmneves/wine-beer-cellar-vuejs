<template>
  <WineItem :wineList="wineListAux" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import WineItem from '@/components/WineItem'

export default {
  components: {
    WineItem
  },

  computed: {
    ...mapGetters(['wineListAux'])
  },

  created () {
    this.getAll()
  },

  methods: {
    ...mapActions(['getAll'])
  }
}
</script>
