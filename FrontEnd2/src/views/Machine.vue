<template>
  <div>
    <Navbar></Navbar>
    <v-main style="height: 100%">
      <div class="machine__container">
        <div class="machine__header">
          <h1>Process Management</h1>
          <v-divider></v-divider>
        </div>
        <div class="machine__content">
          <div class="Select__process">
            <v-col cols="2">
              <v-select
                v-model="select"
                :hint="`${select.state}, ${select.abbr}`"
                :items="items"
                item-text="state"
                item-value="abbr"
                label="Select"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>
          </div>
          <div class="content__up">
            <!-- <v-sheet class="mx-auto" elevation="8" max-width="800"> -->
            <v-slide-group v-model="machines" class="pa-4" center-active show-arrows>
              <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
                <v-card
                  class="ma-4"
                  :class="{ 'on-active': active }"
                  :color="active ? 'white' : 'grey lighten-5'"
                  :elevation="active ? 12 : 2"
                  height="300"
                  width="550"
                  @click="toggle"
                >
                  <MachineItem />
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </div>
          <v-divider></v-divider>
          <div class="content__down">
            <div class="Process_line_Title"><h3>Process version</h3></div>
            <div class="content__down__body" style="display: flex">
              <div class="content__down__left">
                <div class="Process_CurVersion">
                  <v-card class="mx-auto" max-width="344">
                    <v-card-text>
                      <div>current version</div>
                      <p class="text-h4 text--primary">v.2.1</p>
                      <p>adjective</p>
                      <div class="text--primary">
                        relating to or dependent on charity; charitable.<br />
                        "an eleemosynary educational institution."
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
              <v-spacer></v-spacer>
              <div class="content__down__right">
                <div class="History_list_title">HISTORY</div>
                <div class="History_list">
                  <v-expansion-panels>
                    <v-expansion-panel v-for="(item, i) in 3" :key="i">
                      <v-expansion-panel-header>
                        <p>version1</p>
                        <v-spacer></v-spacer>
                        <p>2022/02/12</p>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </div>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Machine',
  components: {
    Navbar,
    MachineItem
  },
  data() {
    return {
      // data: 50
      select: { state: 'Machine Name', abbr: 'Address' },
      items: [
        { state: '은택공정', abbr: '45 Rockefeller Plaza, New York, NY 10111, United States', machineId: 2 },
        { state: '윤성공정', abbr: 'London SW1A 0AA, United Kingdom', machineId: 4 },
        { state: '민혁공정', abbr: '6 Chome-6-1 Shinjuku, Shinjuku City, Tokyo 160-0022, Japan', machineId: 3 },
        { state: '준규공정', abbr: 'Pl. Charles de Gaulle, 75008 Paris, France', machineId: 1 }
      ],
      machines: [],
      machine: {
        machine_name: null,
        machine_status: null,
        machine_image: null,
        manager: null,
        information: null
      }
    }
  },
  computed: {
    ...mapState('Machine', {
      Machine: 'Machine'
    })
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions('Machine', ['GET_Machine'])
  }
}
</script>

<style>
.machine__container {
  width: 96%;
  height: 93%;
  margin: 2% auto;
  /* border: 1px solid black; */
  /* border-radius: 30px; */
  /* box-sizing: border-box; */
  background-color: white;
}
.machine__header {
}
.machine__header > h1 {
  display: inline-block;
  margin: 2% 0px 0.5% 50px;
}
.Select__process {
  margin: 0 0 0 2.5%;
}
.machine__content {
  width: 100%;
  height: 75vh;
  /* overflow: scroll; */
  /* box-sizing: border-box; */
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
  width: 100%;
  margin: 0 0 0 1%;
  padding: 1.5% 0 0 0;
  display: grid;
}
.Process_line_Title {
  margin-left: 3%;
  width: 100%;
}
.content__down__body {
  width: 100%;
  margin: 0 0 0 2%;
}

.content__down__left {
  width: 40%;
  height: 100%;
  margin: 2% 0 0 0;
}
.Process_CurVersion {
  width: 100%;
  margin: 5% 0 0 0;
}
.content__down__right {
  width: 60%;
  height: 100%;
  margin: 0 10% 0 10%;
  /* background-color: blue; */
}
.History_list_title {
  margin: 1.5% 3% 3% 3%;
}
.ma-4 {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
.ma-4:not(.on-active) {
  opacity: 0.2;
}
</style>
