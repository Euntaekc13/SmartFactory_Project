<template>
  <div>
    <Navbar></Navbar>
    <v-main>
      <h3>Machine Page</h3>
      <!-- <div class="donut-chart" :data-percent="`${data}`">
        <p>{{ data }}%</p>
      </div> -->
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import $ from 'jquery'

export default {
  name: 'Machine',
  components: {
    Navbar
  },
  data() {
    return {
      data: 50
    }
  },
  created() {},
  mounted() {}
}
</script>

<style></style>
