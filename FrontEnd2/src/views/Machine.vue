<template>
  <div>
    <Navbar></Navbar>
    <v-main>
      <div class="machine__container">
        <div class="machine__header">
          <h1>Process Management</h1>
          <v-divider></v-divider>
        </div>
        <div class="machine__content">
          <span>OO 공정 설비 리스트</span>
          <div class="content__up">
            <!-- <v-sheet class="mx-auto" elevation="8" max-width="800"> -->
            <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
              <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
                <v-card
                  :color="active ? 'grey lighten-5' : 'grey lighten-1'"
                  class="ma-4"
                  height="300"
                  width="550"
                  @click="toggle"
                >
                  <MachineItem />
                </v-card>
              </v-slide-item>
            </v-slide-group>
            <!-- </v-sheet> -->
          </div>
          <v-divider></v-divider>
          <div class="content__down">
            <div class="content__down__left">
              <span>S/W 정보</span>
            </div>
            <div class="content__down__right">
              <span>여기는 무엇이 들어갈까요 ??</span>
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import MachineItem from '../components/MachineItem.vue'

export default {
  name: 'Machine',
  components: {
    Navbar,
    MachineItem
  },
  data() {
    return {
      data: 50
    }
  },
  created() {},
  mounted() {}
}
</script>

<style>
.machine__container {
  width: 96%;
  height: 93%;
  margin: 2% auto;
  /* border: 1px solid black; */
  border-radius: 30px;
  box-sizing: border-box;
  background-color: white;
}

.machine__header {
}
.machine__header > h1 {
  display: inline-block;
  margin: 2% 0px 0.5% 50px;
}

.machine__content {
  width: 100%;
  height: 75vh;
  /* overflow: scroll; */
  box-sizing: border-box;
  /* overflow-y: hidden; */
  /* background-color: red; */
}
.content__up {
  display: flex;
  margin: 1% auto;
  height: 47%;
  width: 90%;
  /* background-color: aqua; */
  align-items: center;
}
.content__down {
  height: 47%;
  width: 90%;
  margin: 0 auto;
  padding: 3% 0%;
  /* background-color: blueviolet; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.content__down__left {
  width: 60%;
  height: 100%;
  /* background-color: bisque; */
  border: 1px solid black;
}
.content__down__right {
  width: 35%;
  height: 100%;
  /* background-color: blue; */
  border: 1px solid black;
}
</style>
