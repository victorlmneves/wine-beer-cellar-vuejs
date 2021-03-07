<template>
  <div class="filters">
    <div class="filters__wrap">
      <router-link
        class="filters__add-item"
        to="/add-item"
        >
        Add Item
      </router-link>
    </div>
    <div class="filters__wrap">
      <input
        class="filters__search"
        type="text"
        placeholder="search..."
        name="filter"
        v-model="search"
        @keyup="filter($event)"
      >
    </div>
    <div class="filters__wrap">
      <label class="filters__label" for="filters">Sort by</label>
      <select class="filters__select" name="filters" @change="sort($event)">
        <option value="name asc">Name ↑</option>
        <option value="name desc">Name ↓</option>
        <option value="year asc">Year ↑</option>
        <option value="year desc">Year ↓</option>
        <option value="price asc">Price ↑</option>
        <option value="price desc">Price ↓</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      search: ''
    }
  },

  methods: {
    ...mapActions({
      sortBY: 'wine/sortBY',
      filterBY: 'wine/filterBY'
    }),

    sort (event) {
      this.sortBY(event.target.value);
    },

    filter (event) {
      this.filterBY(event.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-content: stretch;
  align-items: flex-start;
  padding: 0 16px 16px;

  &__wrap {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
  
    &:first-child {
      order: 0;
      flex: 1 1 auto;
      text-align: left;
    }

    :not(:last-child) {
      margin-right: 24px;
    }
  }

  &__label {
    padding-right: 8px;
  }

  &__search,
  &__select {
    padding: 4px 8px;
  }
}
</style>
