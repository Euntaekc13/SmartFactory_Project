<template>
  <div style="max-height: 100vh; box-sizing: border-box">
    <Navbar></Navbar>
    <v-main>
      <div class="history__header">
        <h1>
          History Data List <span class="header__count">({{ countAll }})</span>
        </h1>
        <!-- <v-divider vertical></v-divider> -->
        <!-- <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field> -->
      </div>
      <div class="history__content">
        <!-- <input type="text" submit />
        <button submit>check</button> -->
        <div class="history__content__up">
          <div class="history_content_icons">
            <button type="button" @click="excelDown">
              <span class="icon-button excel">
                <i class="fa-solid fa-file-arrow-down icon-excel"></i><span></span>
              </span>
            </button>
            &nbsp;
            <button type="button" @click="excelDown">
              <span class="icon-button repeat"> <i class="fa-solid fa-retweet icon-repeat"></i><span></span> </span>
            </button>
          </div>
          <div class="history_content_condition">
            <!-- <span>date picker</span>&nbsp; -->
            <div>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dates" range no-title>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(dates)"> OK </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
            <span>공정 선택</span>&nbsp;
            <span>양품/고품</span>
          </div>
        </div>
        <v-card class="histroy__card" elevation="4" max-height="100vh">
          <v-card-title>
            <!-- <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field> -->
          </v-card-title>
          <v-data-table :headers="headers" :items="details" :search="search" :items-per-page="8"></v-data-table>
        </v-card>
      </div>
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'History',
  components: {
    Navbar
  },
  data() {
    return {
      search: '',
      countAll: 0,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dates: [
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
      ],
      headers: [
        {
          text: 'Serial information',
          align: 'start',
          filterable: false,
          value: 'serial'
        },
        { text: 'process_result', value: 'GoodSet' },
        { text: 'color', value: 'white' },
        { text: 'machine_info', value: '준규공정' },
        { text: 'test_date', value: '20221213' },
        { text: 'diceInfo', value: 'include' }
      ],
      details: [
        {
          serial: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          serial: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          serial: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          serial: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          serial: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          serial: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          serial: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          serial: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          serial: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          serial: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    }
  },
  methods: {
    async excelDown() {
      const xlsx = require('xlsx')
      // 엑셀 파일 생성
      const book = xlsx.utils.book_new()

      // data get > 실 개발시 api 호출
      const fruitDataByAoa = await this.getFruitDataByAoa()
      const fruitDataByJson = await this.getFruitDataByJson()

      // sheet 생성 - aoa_to_sheet 방식
      const worksheetByAoa = xlsx.utils.aoa_to_sheet(fruitDataByAoa)

      // sheet 생성 - json_to_sheet 방식
      const worksheetByJson = xlsx.utils.json_to_sheet(fruitDataByJson)

      // 엑셀 파일에 sheet set(엑셀파일, 시트데이터, 시트명)
      xlsx.utils.book_append_sheet(book, worksheetByAoa, 'aoa')
      xlsx.utils.book_append_sheet(book, worksheetByJson, 'json')

      // 엑셀 다운로드
      xlsx.writeFile(book, 'fruit.xlsx')
    },
    // aoa는 행열 데이터를 엑셀과 동일하게 get
    getFruitDataByAoa() {
      let arr = []
      arr.push(['이름', '칼로리', '지방', '탄수화물', '단백질', '철분'])
      arr.push(['바나나', '159', '6.0', '24', '4.0', '1'])
      arr.push(['사과', '237', '9.0', '37', '2.3', '4'])
      arr.push(['오렌지', '78', '1.2', '45', '1.1', '3.3'])
      return arr
    },
    getFruitDataByJson() {
      let arr = []
      arr.push({ 이름: '바나나', 칼로리: 159, 지방: 6.0, 탄수화물: 24, 단백질: 4.0, 철분: '1' })
      arr.push({ 이름: '사과', 칼로리: 237, 지방: 9.0, 탄수화물: 37, 단백질: 2.3, 철분: '4' })
      arr.push({ 이름: '오렌지', 칼로리: 78, 지방: 1.2, 탄수화물: 45, 단백질: 1.1, 철분: '3.3' })
      return arr
    }
  }
}
</script>

<style scoped>
* {
  background-color: white;
}
.history__header {
  display: flex;
  padding: 2% 4% 2% 4%;
  border-bottom: 2px solid #e0e0e0;
  /* background-color: red; */
}
.header__count {
  color: #e0e0e0;
  font-size: 0.7em;
}
.history__content {
  box-sizing: border-box;
  height: 80vh;
  padding: 1% 4% 2% 4%;
}
.histroy__card {
  box-sizing: border-box;
}
.history__content__up {
  /* background-color: red; */
  padding: 0% 0% 0% 0%;
  display: flex;
  justify-content: space-between;
}
.icon-button {
  background-color: white;
  border-radius: 3.6rem;
  cursor: pointer;
  display: inline-block;
  font-size: 2rem;
  height: 3.6rem;
  line-height: 3.6rem;
  margin: 0 5px;
  position: relative;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 3.6rem;
}
/* .excel {
  border: 2px solid #1e6f43;
} */
/* .repeat {
  border: 2px solid #3b5998;
} */

/* Circle */
.icon-button span {
  /* background-color: #1e6f43; */
  /* background-color: red; */
  border-radius: 0;
  display: block;
  height: 0;
  left: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  width: 0;
}
.icon-button:hover span {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 3.6rem;
  margin: -1.8rem;
}
.excel span {
  background-color: #1e6f43;
}
.repeat span {
  background-color: #3b5998;
}

/* Icons */
.icon-button i {
  background: none;
  color: white;
  height: 3.6rem;
  left: 0;
  line-height: 3.6rem;
  position: absolute;
  top: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  width: 3.6rem;
  z-index: 10;
}
.icon-button .icon-excel {
  color: #1e6f43;
}
.icon-button .icon-repeat {
  color: #3b5998;
}

.icon-button:hover .icon-excel {
  color: white;
}

.icon-button:hover .icon-repeat {
  color: white;
}

.icon-button .icon-repeat {
  color: #3b5998;
}
</style>
