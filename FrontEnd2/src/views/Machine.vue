<template>
  <v-app>
    <Navbar></Navbar>
    <v-main style="height: 100%">
      <!-- <div class="machine__container"> -->
      <div class="machine__header">
        <h1>Process Management</h1>
        <!-- <v-divider></v-divider> -->
      </div>
      <div class="machine__content">
        <div class="content__up__header">
          <h3 class="process_title">Process</h3>
          <div :class="[select == null ? 'Select__process' : 'after_Select__process']">
            <v-col cols="10">
              <v-select
                v-model="select"
                :items="machines"
                label="Select Factory"
                persistent-hint
                dense
                outlined
              ></v-select>
            </v-col>
          </div>
        </div>
        <div class="content__up">
          <div v-if="select == null" class="beforeSelect">
            <h1 style="color: #a9a9a9">Please Select Factory</h1>
          </div>
          <v-slide-group v-else class="pa-4">
            <v-slide-item v-for="processData in processes" :key="processData.processId" v-slot="{ active, toggle }">
              <v-card
                class="ma-4"
                :class="{ 'on-active': active }"
                :color="active ? 'white' : 'white'"
                :elevation="active ? 12 : 2"
                height="300"
                width="550"
                @click="toggle"
              >
                <MachineItem :process-data="processData" />
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </div>
        <v-divider></v-divider>
        <div class="content__down">
          <div class="Process_line_Title"><h3>Software Version</h3></div>
          <div class="content__down__body" style="display: flex">
            <div class="content__down__left">
              <div class="Process_CurVersion">
                <v-card class="mx-auto" max-width="344">
                  <v-card-text v-if="selected">
                    <div>Current version</div>
                    <p class="text-h4 text--primary">{{ softwareVersionList[0].softwareVersion }}</p>
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
              <div class="History_list_title"><h5>HISTORY</h5></div>
              <div class="History_list">
                <v-expansion-panels v-show="selected">
                  <v-expansion-panel v-for="(softwareData, i) in softwareVersionList" :key="i">
                    <v-expansion-panel-header>
                      <p>Version : {{ softwareData.softwareVersion }}</p>
                      <v-spacer></v-spacer>
                      <p>Updated : {{ softwareData.softwareVersionApplied }}</p>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      This page is for the description of selected software version. Please add the data on your DB in
                      order for it to be rendered correctly.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </v-main>
  </v-app>
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
      select: null,
      // selectinfo: { machine_name: 'Machine Name', information: 'Machine Information' },
      selected: false,
      machines: [],
      processes: [],
      processData: {
        processId: 0,
        processType: 0,
        processCount: 0,
        processMax: 0,
        processStart: ''
      },
      softwareVersionList: [],
      softwareData: {
        softwareVersion: '',
        softwareVersionApplied: ''
      }
    }
  },
  computed: {
    ...mapState('Machine', {
      Machine: 'Machine'
    })
  },
  watch: {
    select(newSelect) {
      let tempNumber = 0
      for (let i = 0; i < this.Machine.length; i++) {
        if (this.Machine[i].machine_name == newSelect) {
          tempNumber = this.Machine[i].id
        }
      }
      this.machineSelectReset()
      this.softwareListReset()
      this.selected = true

      this.machineSelect(tempNumber)
      this.getSoftwareVersionList(tempNumber)
    }
  },
  created() {
    this.getMachineInfo()
    this.updateMachineInfo()
  },
  mounted() {},
  methods: {
    ...mapActions('Machine', ['GET_MACHINE']),
    async getMachineInfo() {
      await this.GET_MACHINE().then(() => {
        console.log('Success to get machine information')
      })
    },
    updateMachineInfo() {
      let arr = []
      for (let i = 0; i < this.Machine.length; i++) {
        arr.push(this.Machine[i].machine_name)
      }
      this.machines = arr
    },
    machineSelect(selectedMachineId) {
      if (selectedMachineId) {
        let i = 0
        let realMachineId = selectedMachineId - 1

        for (i = 0; i < this.Machine[realMachineId].Parts.length; i++) {
          this.processData.processId = this.Machine[realMachineId].Parts[i].id
          this.processData.processType = this.Machine[realMachineId].Parts[i].Part_default.part_type
          this.processData.processCount = this.Machine[realMachineId].Parts[i].count
          this.processData.processMax = this.Machine[realMachineId].Parts[i].Part_default.max_life
          this.processData.processStart = this.Machine[realMachineId].Parts[i].Part_default.createdAt
          this.processes.push(this.processData)

          // console.log('은택이 가보자구 ~~', this.processes)

          this.processData = {
            processId: 0,
            processType: 0,
            processCount: 0,
            processMax: 0,
            processStart: ''
          }
        }
      } else {
        console.log('Please select the line')
      }
    },
    machineSelectReset() {
      this.processes = []
    },
    getSoftwareVersionList(selectedMachineId) {
      let i = 0
      let realMachineId = selectedMachineId - 1

      for (i = 0; i < this.Machine[realMachineId].Software_histories.length; i++) {
        this.softwareData.softwareVersion = this.Machine[realMachineId].Software_histories[i].software_version
        this.softwareData.softwareVersionApplied = this.Machine[realMachineId].Software_histories[i].createdAt

        this.softwareVersionList.push(this.softwareData)

        // console.log(this.softwareVersionList, '은택이 지각 !')

        this.softwareData = {
          softwareVersion: '',
          softwareVersionApplied: ''
        }
      }
    },
    softwareListReset() {
      this.softwareVersionList = []
    }
  }
}
</script>

<style scoped>
.machine__container {
  width: 96%;
  height: 93%;
  /* border: 1px solid black; */
  /* border-radius: 30px; */
  /* box-sizing: border-box; */
  background-color: white;
}

.machine__header {
  padding: 2% 4% 2% 4%;
  border-bottom: 2px solid #e0e0e0;
}
.process_title {
  margin-top: 2%;
}
.beforeSelect {
  margin-left: 40%;
}
.Select__process {
  margin: 1% 5% 0 0%;
  top: 300px;
  left: 36.1%;
  position: relative;
}
.after_Select__process {
  margin: 1% 0 0 3%;
  position: relative;
  animation: select-out 3s ease-out forwards;
  top: 300px;
  left: 36.1%;
  /* top: 0px;
  right: 0%; */
}
@keyframes select-out {
  0% {
    transform: translateY(30px) translateX(-15%);
    opacity: 1;
  }
  25% {
    transform: translateY(-100px) translateX(-15%);
    opacity: 0;
  }
  50% {
    transform: translateY(-300px) translateX(-80%);
    opacity: 0;
  }
  85% {
    transform: translateY(-300px) translateX(-130%);
    opacity: 0;
  }
  100% {
    transform: translateY(-300px) translateX(-170%);
    opacity: 1;
  }
}
.pa-4 {
  animation: comming 2s ease-out forwards;
}
@keyframes comming {
  from {
    transform: translateY(800px);
  }
  to {
    transform: translateY(0px);
  }
}
.machine__content {
  width: 100%;
  height: 75vh;
}
.content__up {
  display: flex;
  margin: 1% auto 5% auto;
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
.content__up__header {
  margin: 1% 0 0 4.5%;
  width: 100%;
  display: flex;
}
.Process_line_Title {
  margin: 3% 0 0 3%;
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
