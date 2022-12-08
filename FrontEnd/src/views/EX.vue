<template>
  <div class="home">
    <Navbar></Navbar>
    <v-main> check NavBar </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'EX',
  components: {
    Navbar
  }
}
</script>

<style scoped>
.home {
}
.sideBar {
}
</style>
