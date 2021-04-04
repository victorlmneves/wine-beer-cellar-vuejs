<template>
  <div class="header">
    <router-link class="back-link" to="/">
      <h1 class="header__title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>
