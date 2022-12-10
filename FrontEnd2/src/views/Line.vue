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
                  <h3>{{ line.title }}</h3>
                </div>
                <div slot="name">
                  <p>{{ line.name }}</p>
                </div>
                <div slot="description">
                  <p>{{ line.description }}</p>
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
      topic: 'myEdukit',
      lines: [
        {
          title: '준규공정',
          name: '이준규',
          description: '이준규가 관리하는 핫식스 공장',
          id: 1
        },
        {
          title: '은택공정',
          name: '최은택',
          description: '최은택이 관리하는 도시락 공장',
          id: 2
        },
        {
          title: '민혁공정',
          name: '김민혁',
          description: '김민혁이 관리하는 카메라 공장',
          id: 3
        },
        {
          title: '윤성공정',
          name: '옥윤성',
          description: '옥윤성이 관리하는 컴퓨터 공장',
          id: 4
        }
      ]
    }
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
}
</style>
