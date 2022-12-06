<template>
  <div>
    <h1>EX {{ data }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 0
    }
  },
  // 라우터를 지켜보고 있다가 바뀌면 바꿔주게 함
  watch: {
    $route() {
      this.ID = this.$route.params.cid
    }
  },
  created() {
    this.ID = this.$route.params.cid
  }
}
</script>

<style lang="scss" scoped></style>
