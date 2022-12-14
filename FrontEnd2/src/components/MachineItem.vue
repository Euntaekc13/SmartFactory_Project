<template>
  <div class="machine-container"></div>
</template>

<script>
export default {}
</script>

<style scoped>
.machine-container {
  width: 80%;
  height: 80%;
  margin: 7% 10% 5% 10%;
  position: relative;
  border: 1px solid black;
  margin-right: 3%;
}

.machine-container:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
</style>
