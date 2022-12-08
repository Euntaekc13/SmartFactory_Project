<template>
  <div>
    <Navbar></Navbar>
    <v-main>
      <h3>Monitoring Page</h3>
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Monitoring',
  components: {
    Navbar
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
