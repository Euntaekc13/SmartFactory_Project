<template>
  <div>
    <Navbar></Navbar>
    <v-main>
      <h1>Line Page</h1>
      <Item>
        <div slot="title"><h3>Title</h3></div>
        <div slot="subtitle"><p>subtitle</p></div>
        <div slot="description"><p>body</p></div>
        <div slot="footer">
          <router-link to="/monitoring" style="text-decoration: none">
            <v-btn>monitoring</v-btn>
          </router-link>
        </div>
      </Item>
    </v-main>
  </div>
</template>

<script>
import Item from '../components/Item.vue'
export default {
  name: 'Line',
  components: {
    Item
  },
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped></style>
