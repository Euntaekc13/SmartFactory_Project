<template>
  <div>
    <Navbar></Navbar>
    <v-main>
      <h1>Line Page</h1>
      <v-card class="Line-Card">
      <Item>
        <div slot="title"><h3>Title</h3></div>
        <div slot="subtitle"><p>subtitle</p></div>
        <div slot="description"><p>body</p></div>
        <div slot="footer">
          <router-link :to="`/monitoring/${url}/${port}/${topic}`" style="text-decoration: none">
            <v-btn>monitoring</v-btn>
          </router-link>
        </div>
      </Item>
    </v-card>
    <v-card class="Line-Card">
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
    </v-card>
    </v-main>

  </div>
</template>

<script>

import Item from '../components/Item.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Line',
  components: {
    Item,
    Navbar
  },
  data() {
    return {
      url: '192.168.0.72',
      port: '9001',
      topic: 'myEdukit'
    }
  }
}
</script>

<style>
.Line-Card {
  width: 55%;
  margin: 0 0 0 25%;
}

</style>
