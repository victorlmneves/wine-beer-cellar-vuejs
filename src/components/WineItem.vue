<template>
  <div class="wine-list">
    <div
      v-for="wine in wineList"
      :key="wine.id"
      class="wine-list__item"
    >
      <router-link
        class="wine-list__link"
        :to="{
          name: 'WineDetails',
          params: { 
            id: wine.id 
          }
        }"
      >
        <img class="wine-list__image"
          :alt="wine.name"
          :src="`https://res.cloudinary.com/vitorneves/image/upload/v1614884127/wineChallenge/${wine.picture}`"
        />
        <div class="wine-list__info">
          <h3 class="wine-list__name">{{wine.name}}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WineItem',

  props: {
    wineList: Array
  }
}
</script>

<style lang="scss" scoped>
.wine-list {
  display: grid;
  grid-gap: $unit*6 $unit*4;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  align-items: center;
  justify-content: space-between;
  justify-items: center;
  padding: 0 $unit*4 $unit*6 $unit*4;

  &__item {
    margin: 0 $unit $unit*2;
    border: 1px solid #eee;
    padding: $unit*5;
    height: 100%;
    width: 100%;
  }

  &__info {
    text-align: center;
  }

  &__name {
    font-size: 20px;
    line-height: 1.2;
  }

  &__image {
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    max-height: 300px;
  }
}
</style>
