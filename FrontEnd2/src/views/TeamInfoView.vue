<template>
  <div>
    <Navbar></Navbar>
    <v-main>
      <h1>Team LOCK 의 소개 페이지 입니다.</h1>
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'TeamInfoView',
  components: {
    Navbar
  },
  data() {
    return {}
  }
}
</script>

<style></style>
