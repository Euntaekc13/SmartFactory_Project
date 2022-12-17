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
          <div class="history_content_condition">
            <!-- <span>date picker</span>&nbsp; -->
            <div id="inspire" style="width: 37%; max-width: 37%" class="history_content_condition-select">
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
                    outlined
                    label="Date Coverage"
                    readonly
                    v-bind="attrs"
                    dense
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
            <div class="history_content_condition-select">
              <v-select v-model="machine_title" :items="machines" label="Machine title" dense outlined></v-select>
            </div>
            <div class="history_content_condition-select">
              <v-select v-model="itemStatus" :items="itemsStatus" label="Result Status" outlined dense></v-select>
            </div>
            <button type="button" class="history_content_condition-postBtn" @click="getHistoryData">Search</button>
            <!-- <v-btn class="history_content_condition-postBtn">Search</v-btn> -->
            <!-- <v-btn class="history_content_condition-postBtn">조회</v-btn> -->
            <!-- <v-btn class="history_content_condition-postBtn">Search<i class="fa-solid fa-magnifying-glass"></i></v-btn> -->
          </div>
          <div class="history_content_icons">
            <button type="button" @click="getHistoryData">
              <span class="icon-button repeat"> <i class="fa-solid fa-retweet icon-repeat"></i><span></span> </span>
            </button>
            &nbsp;
            <button type="button" @click="excelDown">
              <span class="icon-button excel">
                <i class="fa-solid fa-file-arrow-down icon-excel"></i><span></span>
              </span>
            </button>
          </div>
        </div>
        <v-card class="histroy__card" elevation="4" max-height="100vh">
          <v-card-title class="histroy__card--header">
            <!-- <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field> -->
            <div class="history__card--icon">
              <button class="history__card--button" @click="rightBtn">
                <i class="fa-solid fa-caret-right"></i>
              </button>
            </div>
            <div>{{ table_index / 10 + 1 }} / {{ parseInt(countAll / 10) + 1 }}</div>
            <div class="history__card--icon">
              <button class="history__card--button" @click="leftBtn">
                <i class="fa-solid fa-caret-left"></i>
              </button>
            </div>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="details"
            :search="search"
            :items-per-page="10"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </div>
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapGetters } from 'vuex'
import { history } from '../api/history'

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
      machines: [],
      machine_title: null,
      // itemsStatus: ['ALL', 'GoodSet', 'Failure'],
      itemsStatus: ['ALL', 'GoodSet', 'Failure'],
      itemStatus: null,
      table_index: 0,
      dates: [
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
      ],
      // dates: [
      //   new Intl.DateTimeFormat('ko').format(new Date(Date.now() - new Date().getTimezoneOffset() * 60000)),
      //   new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toLocaleDateString('ko')
      // ],
      history_data: [],
      headers: [
        {
          text: 'Serial information',
          align: 'start',
          filterable: false,
          value: 'serial'
        },

        { text: 'machine_info', value: 'machine_info' },
        { text: 'process_result', value: 'process_result' },
        { text: 'test_date', value: 'test_date' },
        { text: 'category number', value: 'diceInfo' },
        { text: 'description', value: 'description' }
      ],
      details: []
    }
  },
  created() {
    this.getMachineList()
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
    ...mapGetters('Machine', [
      'Machine' // store에서 사용한 변수명과 component에서 사용할 변수명이 같을 경우
    ])
  },
  methods: {
    excelDown() {
      const xlsx = require('xlsx')
      // 엑셀 파일 생성
      const book = xlsx.utils.book_new()

      // data get > 실 개발시 api 호출
      // const fruitDataByAoa = await this.getFruitDataByAoa()
      const fruitDataByJson = this.getFruitDataByJson()

      // sheet 생성 - aoa_to_sheet 방식
      // const worksheetByAoa = xlsx.utils.aoa_to_sheet(fruitDataByAoa)

      // sheet 생성 - json_to_sheet 방식
      const worksheetByJson = xlsx.utils.json_to_sheet(fruitDataByJson)

      // 엑셀 파일에 sheet set(엑셀파일, 시트데이터, 시트명)
      // xlsx.utils.book_append_sheet(book, worksheetByAoa, 'aoa')
      xlsx.utils.book_append_sheet(book, worksheetByJson, 'json')

      // 엑셀 다운로드
      xlsx.writeFile(book, 'Rowdata.xlsx')
    },
    // aoa는 행열 데이터를 엑셀과 동일하게 get
    // getFruitDataByAoa() {
    //   let arr = []
    //   arr.push(['Serial information', 'process_result', 'machine_info', 'test_date', 'diceInfo', 'description'])
    //   arr.push(['바나나', '159', '6.0', '24', '4.0', '1'])
    //   arr.push(['사과', '237', '9.0', '37', '2.3', '4'])
    //   arr.push(['오렌지', '78', '1.2', '45', '1.1', '3.3'])
    //   return arr
    // },
    getFruitDataByJson() {
      let arr = []
      let tempArr = []
      arr.push(['Serial information', 'process_result', 'machine_info', 'test_date', 'category number', 'description'])
      // arr.push({ 이름: '사과', 칼로리: 237, 지방: 9.0, 탄수화물: 37, 단백질: 2.3, 철분: '4' })
      // arr.push({ 이름: '오렌지', 칼로리: 78, 지방: 1.2, 탄수화물: 45, 단백질: 1.1, 철분: '3.3' })
      for (let i = 0; i < this.history_data.length; i++) {
        // arr.push(this.history_data[i])
        for (var key in this.history_data[i]) {
          tempArr.push(this.history_data[i][key])
        }
        arr.push(tempArr)
        tempArr = []
      }
      console.log('ARRRRRRR')
      console.log(arr)
      return arr
    },
    getMachineList() {
      this.machines.push('ALL')
      for (let i = 0; i < this.Machine.length; i++) {
        this.machines.push(this.Machine[i].machine_name)
      }
    },
    getHistoryData() {
      this.table_index = 0
      this.history_data = []
      let MachineId = null
      let final_result = null

      // axios 호출
      // console.log(this.dates)
      let start_date = this.dates[0]
      let end_date = this.dates[1]
      for (let i = 0; i < this.Machine.length; i++) {
        if (this.Machine[i].machine_name == this.machine_title) {
          MachineId = this.Machine[i].id
          break
        }
        MachineId = null
      }

      console.log('#############################')
      console.log(this.itemStatus)
      // 영어로 바꿀수도 있음
      // if (this.itemStatus == 'GoodSet') {
      //   final_result = 1
      // } else if (this.itemStatus == 'Failure') {
      //   final_result = 2
      // } else {
      //   final_result = null
      // }
      if (this.itemStatus == 'GoodSet') {
        final_result = 1
      } else if (this.itemStatus == 'Failure') {
        final_result = 2
      } else {
        final_result = null
      }

      // 주사위 눈 추가 될 수 있음
      console.log(start_date, end_date, MachineId, final_result)

      history.getHistoryData({ start_date, end_date, MachineId, final_result }).then(res => {
        let tempData = {}
        console.log('get res', res.data.data.test_result)
        // this.history_data = res.data.data.test_result
        for (let i = 0; i < res.data.data.test_result.length; i++) {
          tempData.serial = res.data.data.test_result[i].serial_number
          if (res.data.data.test_result[i].final_result == 2) {
            tempData.process_result = 'Failure'
          } else {
            tempData.process_result = 'GoodSet'
          }
          tempData.machine_info = res.data.data.test_result[i].Machine.machine_name
          // tempData.test_date = res.data.data.test_result[i].createdAt
          // tempData.test_date = new Date(res.data.data.test_result[i].createdAt).toLocaleString('ko')
          tempData.test_date = new Date(res.data.data.test_result[i].createdAt).toLocaleDateString('ko', {
            minute: 'numeric',
            hour: 'numeric',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            weekday: 'short'
          })
          tempData.diceInfo = res.data.data.test_result[i].dice_num
          if (res.data.data.test_result[i].description == null) {
            tempData.description = ''
          } else {
            tempData.description = res.data.data.test_result[i].description
          }

          this.history_data.push(tempData)
          tempData = {}
        }
        console.log('hd', this.history_data)
        // 총 개수 카운트
        this.countAll = this.history_data.length
        // 표에 그리기
        this.details = []
        if (this.history_data.length > 10) {
          for (let i = 0; i < 10; i++) {
            this.details.push(this.history_data[i])
          }
        } else {
          for (let i = 0; i < this.history_data.length; i++) {
            this.details.push(this.history_data[i])
          }
        }
      })
    },
    rightBtn() {
      if (this.table_index + 10 > this.history_data.length) return
      this.details = []
      this.table_index += 10
      for (let i = this.table_index; i < this.table_index + 10; i++) {
        this.details.push(this.history_data[i])
      }
    },
    leftBtn() {
      if (this.table_index == 0) return
      this.table_index -= 10
      this.details = []
      for (let i = this.table_index; i < this.table_index + 10; i++) {
        this.details.push(this.history_data[i])
      }
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
.history_content_condition {
  display: flex;
  align-items: center;
  /* box-sizing: border-box; */
}
.history_content_condition-select {
  margin-right: 3%;
  margin-top: 1%;
}
.histroy__card--header {
  display: flex;
  flex-direction: row-reverse;
}
.history__card--icon {
  margin: 0 10px;
}
.history__card--button {
  border-radius: 50%;
}

.history__card--button > i {
  width: 30px;
  height: 30px;
  padding-top: 5px;
}
.history__card--button > i:hover {
  background-color: #cfd8dc;
  border-radius: 50%;
}
.history_content_condition-postBtn {
  margin-bottom: 20px;
}
.history_content_condition-postBtn {
  padding: 7px 17px;
  /* border: 1px solid black; */
  border-radius: 15px;
  color: white;
  background-color: #172b4d;
  transition: all 0.2s;
}
.history_content_condition-postBtn:hover {
  transform: scale(1.1);
}
input {
  width: 10%;
}
table.v-table tbody th > span {
  font-size: 100px !important;
}
th {
  background-color: red;
}
</style>
