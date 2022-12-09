<template>
  <div>
    <div class="Item">
      <div class="Item-title">
        <slot name="title"> default Title </slot>
      </div>
      <div class="Item-body">
        <div class="Item-body-subtitle">
          <slot name="subtitle"> default subtitle </slot>
        </div>
        <div class="Item-body-description">
          <slot name="description"> default body </slot>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="Item-footer">
        <slot name="footer"> default button </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data() {
    return {
      data: 0
    }
  }
}
</script>

<style scoped>
.Item {
  margin: 10% 0 0 10%;

  display: flex;
}
.Item-title {
  padding: 5% 0 0 1%;

  margin: 0 2% 0 0;
}

.Item-body {
  margin: 2% 0 0 10%;
  padding: 1% 0 0 5%;
}

.Item-footer {
  padding: 2% 2% 0 0;
  margin: 2% 2% 2% 2%;
}
</style>
