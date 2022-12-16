<template>
  <v-app id="app">
    <router-view class="inside" />
  </v-app>
</template>

<script>
export default {
  //
}
</script>

<style>
.inside {
  height: 100vh;
  background-color: #c1ccd7;
  box-sizing: border-box;
}
/* @font-face {
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: 300;
  unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
} */
/* @font-face {
  font-family: 'Hahmlet', serif;
  font-style: normal;
  font-weight: 300;
  src: local(※), url(fonts/Hahmlet.woff) format('woff');
  unicode-range: U+AC00- U+D7A3;
} */
* {
  font-family: 'Raleway', sans-serif;
  /* font-family: 'Hahmlet', serif; */
}
</style>
