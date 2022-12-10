<template>
  <div>
    <Navbar></Navbar>
    <v-main style="box-sizing: border-box; heigth: 100vh; max-height: 100vh">
      <div class="line__container">
        <div class="line__header">
          <h1>공정 관리</h1>
          <v-divider></v-divider>
        </div>
        <div class="line__content">
          <div>
            <div v-for="(line, index) in lines" :key="index" class="Line-Card">
              <item-2>
                <div slot="title">
                  <h3>{{ line.machine_name }}</h3>
                </div>
                <span slot="status" style="font-size: 18px">
                  <p v-if="line.machine_status === 0">&nbsp;● 대기 중</p>
                  <p v-else-if="line.machine_status === 1" style="color: #81c784">&nbsp;● 동작 중</p>
                  <p v-else-if="line.machine_status === 2" style="color: #e53935">&nbsp;● 고장 !!</p>
                  <p v-else style="color: black">&nbsp;미정</p>
                </span>
                <div slot="name">
                  <p>{{ line.manager }}</p>
                </div>
                <div slot="description">
                  <p>{{ line.information }}</p>
                </div>
                <div slot="footer">
                  <router-link :to="`/monitoring/${line.id}`" style="text-decoration: none">
                    <!-- <v-btn>monitoring</v-btn> -->
                    <button class="btn">monitoring</button>
                  </router-link>
                </div>
              </item-2>
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
// import Item from '../components/Item.vue'
import Item2 from '../components/Item2.vue'
import Navbar from '@/components/Navbar.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  // name: 'Line',
  components: {
    // Item,
    Item2,
    Navbar
  },
  data() {
    return {
      url: '192.168.0.72',
      port: '9001',
      topic: 'machine',
      lines: []
    }
  },
  computed: {
    ...mapGetters('Machine', [
      'Line' // store에서 사용한 변수명과 component에서 사용할 변수명이 같을 경우
    ])
  },
  async mounted() {
    await this.GET_LINE().then(() => {
      this.lines = this.Line
    })
  },
  methods: {
    ...mapActions('Machine', ['GET_LINE'])
  }
}
</script>

<style>
.line__container {
  width: 96%;
  height: 93%;
  margin: 2% auto;
  /* border: 1px solid black; */
  border-radius: 30px;
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
/* .btn:hover {
  transform: scale(1.5);
} */
</style>
