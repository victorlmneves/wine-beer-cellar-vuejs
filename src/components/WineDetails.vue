<template>
  <div class="wine">
    <div
      v-if="wineDetails"
      class="wine__item"
    >
      <img class="wine__image"
        :alt="wineDetails.name"
        :src="`https://res.cloudinary.com/vitorneves/image/upload/v1614884127/wineChallenge/${wineDetails.picture}`"
      />
      <div class="wine__info">
        <h3 class="wine__name">{{wineDetails.name}} - {{wineDetails.year}}</h3>
        <h5 class="wine__producer">{{wineDetails.producer}}</h5>
        <p class="wine__description">{{wineDetails.description}}</p>
        <p class="wine__price">{{wineDetails.price | currency}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'WineDetails',

  filters: {
    currency: value => {
      if (!value) {
        return
      }

      const options = { style: 'currency', currency: 'EUR' }
      value = value.toString()

      return new Intl.NumberFormat('en-US', options).format(value)
    }
  },

  data () {
    return {
      itemId: null
    }
  },

  computed: {
    ...mapGetters(['wineDetails'])
  },

  mounted() {
    setTimeout(() => {
      window.scrollTo({
        top: 100,
        behavior: 'smooth'
      })
    }, 1500)
  },

  created() {
    this.itemId = this.$route.params.id
    this.getById(this.itemId);
  },

  methods: {
    ...mapActions(['getById'])
  }
}
</script>

<style lang="scss" scoped>
.wine {
  padding: 0 $unit*2 $unit*6 $unit*2;

  &__item {
    margin: 0 $unit $unit*2;
    border: 1px solid #eee;
    padding: $unit*5;
    height: 100%;
    display: flex;
  }

  &__info {
    text-align: left;
    margin-right: $unit*10;
  }

  &__name {
    font-size: $unit*8;
    line-height: 1.2;
    margin-bottom: $unit*3;
  }

  &__producer {
    color: #555;
    font-size: 24px;
    line-height: 1.2;
    margin-bottom: $unit*3;
    margin-top: $unit*3;
    padding-bottom: $unit*6;
    padding-top: $unit*6;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  }

  &__price {
    color: #333;
    font-size: 36px;
    line-height: 1;
    margin-top: $unit*6;
  }

  &__image {
    height: 100%;
    max-width: 500px;
    width: 50%;
  }
}
</style>
