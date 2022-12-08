<template>
  <div>
    <Navbar></Navbar>
    <v-main> Design the page here </v-main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Sampleview',
  data() {
    return {}
  },
  computed: {
    ...mapState('SampleStore', {
      example: 'sampleStoredata' //component에서 사용할 변수 명을 별도로 지정할 경우
    }),
    ...mapGetters('SampleStore', [
      'sampleStoreObject' // store에서 사용한 변수명과 component에서 사용할 변수명이 같을 경우
    ])
  },
  methods: {
    ...mapActions('SampleStore', ['FETCH_SAMPLE']),
    sampleMethod() {
      this.FETCH_SAMPLE()
    }
  }
}
</script>

<style lang="scss" scoped></style>
