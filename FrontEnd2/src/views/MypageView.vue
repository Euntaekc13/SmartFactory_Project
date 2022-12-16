<template>
  <div>
    <Navbar></Navbar>
    <v-main style="box-sizing: border-box; heigth: 100vh; max-height: 100vh">
      <div class="line__container">
        <div class="line__header">
          <h1>Account Management</h1>
          <v-divider></v-divider>
        </div>
        <div class="line__content">
          <input />
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
// import Item from '../components/Item.vue'
import Navbar from '@/components/Navbar.vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Machine',
  components: {
    Navbar
  },
  data() {
    return {
      url: '192.168.0.72',
      port: '9001',
      topic: 'machine',
      Machines: []
    }
  },
  computed: {
    ...mapGetters('Machine', ['Machine']),
    ...mapState('Machine', ['Machine'])
    // store에서 사용한 변수명과 component에서 사용할 변수명이 같을 경우
  },
  async mounted() {
    await this.GET_MACHINE().then(() => {
      this.Machines = this.Machine
    })
  },
  methods: {
    ...mapActions('Machine', ['GET_MACHINE'])
  }
}
</script>

<style>
.line__container {
  width: 96%;
  height: 93%;
  margin: 2% auto;
  /* border: 1px solid black; */
  /* border-radius: 30px; */
  box-sizing: border-box;
  background-color: white;
}

.line__header {
}
.line__header > h1 {
  display: inline-block;
  margin: 2% 0px 0.5% 50px;
}

.line__content {
  width: 100%;
  height: 80%;
  min-height: 80vh;
  max-height: 80vh;
  overflow: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  /* overflow-y: hidden; */
}
.line__content::-webkit-scrollbar {
  display: none;
}

.Line-Card {
  width: 80%;
  /* margin: 0 0 0 25%; */
  margin: 0 auto;
}
.btn {
  background-color: #7795f8;
  border: 0;
  border-radius: 50px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  padding: 12px 25px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  letter-spacing: 1px;
  color: #333;
  /* transition: all 0.9s, color 0.3; */
  transition: all 1s;
}

.btn:hover {
  color: #fff;
  box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.25) inset, -200px 0 0 0 rgba(0, 0, 0, 0.25) inset;
}

.btn:hover ~ h1 {
  transform: rotate(0.5turn);
}
</style>
