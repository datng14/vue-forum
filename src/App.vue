<template>
  <TheNavbar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  components: { TheNavbar }
}

</script>

<style>
@import 'assets/styles.css'
</style>
