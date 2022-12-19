<template>
  <body class="Monitoring-body">
    <div class="div-back">
      <button @click="exit()">
        <router-link class="to-left" to="/" style="text-decoration: none"> </router-link>
      </button>
    </div>
    <div class="monitoring__description">
      <div class="Title">
        <p class="monitoring__main__title">FACTORY1</p>
      </div>
      <div class="monitoring__manager">
        <div class="manager__img">
          <v-img :src="userImgRender" alt=""></v-img>
        </div>
        <div class="manager__description">
          <p class="monitoring__subtitle">Manager : {{ assignedUser.userName }} {{ assignedUser.employee_number }}</p>
          <p class="monitoring__subtitle">E-mail : {{ assignedUser.userEmail }}</p>
          <p class="monitoring__subtitle">Emergency contact : {{ assignedUser.userPhone }}</p>
        </div>
      </div>
    </div>
    <div class="chart">
      <DashBoard :output="output" />
      <!-- :Child 에서 쓸꺼 = "Parents 에서 쓸꺼" -->
    </div>
  </body>
</template>

<script>
import DashBoard from '../components/Dashboard.vue'
import { Scene, Renderer, Render } from '../WebGL/Monitoring'
import { MonitoringOB } from '../WebGL/Chips'
import mqtt from 'mqtt'
import { mapActions, mapGetters } from 'vuex'
import * as THREE from 'three'

export default {
  name: 'Monitoring',
  components: {
    DashBoard
  },
  data() {
    return {
      hostname: '192.168.0.58', //
      // port: '****', //
      port: '9001', //
      path: '',
      topic: 'machine',
      start: '', //공정시작 동작
      ActionNum1: '',
      GreenLight: '', //초록불
      YellowLight: '', //노란불
      RedLight: '', //빨간불
      output: {
        total: 0, //일일총생산
        failure: 0, //일일고품
        goodSet: 0, //일일양품
        process1Count: 0,
        process2Count: 0,
        process3Count: 0
      },
      Manager: '',
      ManagerEmail: '',
      ManagerPhone: '',
      no1Action: false,
      no2Action: false,
      WhiteColor: false,
      no3Action: false,
      machineId: '',
      userImgRender: '',
      No1Flag: false,
      firstFlag: false, // 1호기
      secondFlag: false, // 2호기
      thirdFlag: false, // 3호기
      defaultDataSignal: [
        { tagId: '0', name: 'DataTime', value: 'Default' },
        { tagId: '1', name: 'Start', value: true },
        { tagId: '3', name: 'No1_Action', value: false },
        { tagId: '4', name: 'No2_Action', value: false },
        { tagId: '6', name: 'ColorSensor', value: false },
        { tagId: '7', name: 'Reset', value: false },
        { tagId: '13', name: 'lamp_green', value: false },
        { tagId: '14', name: 'lamp_yellow', value: false },
        { tagId: '15', name: 'lamp_red', value: false },
        { tagId: '16', name: 'No3Motor1', value: '0' },
        { tagId: '17', name: 'No3Motor2', value: '0' },
        { tagId: '18', name: 'No2Chip', value: false },
        { tagId: '21', name: 'No2SolAction', value: false },
        { tagId: '23', name: 'Emergency', value: false },
        { tagId: '24', name: 'DiceValue', value: '0' },
        { tagId: '25', name: 'No3Gripper', value: false },
        { tagId: '26', name: 'belt', value: true }
      ]
    }
  },
  computed: {
    ...mapGetters('Machine', {
      Machine: 'Machine'
    }),
    ...mapGetters('Auth', {
      TokenUser: 'TokenUser'
    }),
    ...mapGetters('Monitoring', {
      assignedUser: 'assignedUser',
      cycleCount: 'cycleCount'
    })
  },
  async created() {
    this.getConnectInfo()
    this.connectMqtt()
    await this.getMonitoringInfo()
    this.userImgRenderFunction()
  },
  mounted() {
    this.connection()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  // destroyed() {
  //   this.$store.commit('Monitoring/maxLifeUpdate', null)
  // },
  methods: {
    ...mapActions('Monitoring', ['getMonitoringInfoStoreAction']),
    connection() {
      const container = document.querySelector('.Monitoring-body')

      container.style.width = '100%'
      container.style.height = '100%'
      // Scene Setting
      let scene = new Scene('edukit')
      let cameraElement = scene.camera.cameraElement
      let sceneElement = scene.sceneElement

      // Renderer Setting
      let renderer = new Renderer(container)
      let renderElement = renderer.domElement
      let rendererElement = renderer.rendererElement
      let render = new Render(scene.Object)
      render.element = container
      // render.controls = controlElement
      render.render = renderElement
      render.scene = sceneElement
      render.edukit = scene.resource.edukit
      render.Object = scene.Object
      render.camera = cameraElement
      render.renderer = rendererElement

      // console.log(scene.Object)
      // Rendering Start
      this.setEvent(scene.resource.edukit, render.Object, render)
      render.start()
    },
    connectMqtt() {
      const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
      this.client = mqtt.connect({
        clientId,
        clean: true,
        protocol: 'ws',
        reconnectPeriod: 1000,
        hostname: this.hostname,
        port: this.port,
        path: this.path
      })
    },
    setEvent(edukit, EduStatus, render) {
      this.client.on('connect', () => {
        console.log('MQTT Connected')
        this.client.subscribe([this.topic], () => {
          console.log(`토픽 연결 완료: ${this.topic}`)
        })
        this.client.on('message', (topic, payload) => {
          let message = JSON.parse(payload)

          const machineElements = message.Wrapper
          // tagId 순서로 오름차순 정렬
          let machineElementsSorts = machineElements.sort((a, b) => {
            if (parseInt(a.tagId) > parseInt(b.tagId)) {
              return 1
            } else if (parseInt(a.tagId) < parseInt(b.tagId)) {
              return -1
            } else {
              return 0
            }
          })

          if (machineElementsSorts.length == 17) {
            this.defaultDataSignal = machineElementsSorts
          } else {
            // console.log('에러난듯? 얼른 바꾸자', machineElementsSorts)
            machineElementsSorts = this.defaultDataSignal
            // console.log('바뀐 값 : ', machineElementsSorts)
          }

          let diceNumber = machineElementsSorts[14].value
          if (diceNumber > 2) {
            console.log('dice Number : ', diceNumber)
          }

          let data = machineElementsSorts.filter(p => p.tagId === '16' || p.tagId === '17')
          this.RedLight = machineElementsSorts[8].value //빨간불
          this.YellowLight = machineElementsSorts[7].value //노란불
          this.GreenLight = machineElementsSorts[6].value //초록불
          this.start = machineElementsSorts[1].value //시작
          if (this.start) {
            this.output.fanAction = true
            // console.log('mqtt 시간: ', machineElementsSorts[26])
          } else {
            this.output.fanAction = false
          }
          // Cycle 계산
          // process 1 count cycle
          if (machineElementsSorts[16].value || this.start) {
            if (machineElementsSorts[2].value !== this.no1Action) {
              machineElementsSorts[2].value
                ? ((this.no1Action = true), (this.output.process1Count += 1), (this.firstFlag = true))
                : (this.no1Action = false)
            }
            // process 2 count cycle
            if (machineElementsSorts[12].value !== this.no2Action) {
              machineElementsSorts[12].value
                ? ((this.no2Action = true), (this.output.process2Count += 1), (this.secondFlag = true))
                : (this.no2Action = false)
            }
            // process 3 count cycle
            if (machineElementsSorts[15].value !== this.no3Action) {
              machineElementsSorts[15].value
                ? ((this.no3Action = true), (this.output.process3Count += 1), (this.thirdFlag = true))
                : (this.no3Action = false)
            }
            // Result decided
            if (this.thirdFlag) {
              this.firstFlag && this.secondFlag
                ? ((this.output.total += 1),
                  (this.output.goodSet += 1),
                  (this.secondFlag = false),
                  (this.firstFlag = false),
                  (this.thirdFlag = false))
                : ((this.output.total += 1),
                  (this.output.failure += 1),
                  (this.secondFlag = false),
                  (this.firstFlag = false),
                  (this.thirdFlag = false))
            }
          }
          //1호기 동작
          this.ActionNum1 = machineElementsSorts[2].value
          data = data.map(p => parseInt(p.value))
          edukit['yAxis'] = data[0]
          edukit['xAxis'] = data[1]

          // console.log(EduStatus) //scene 내부의 mesh list
          const GreenPhongMaterial = new THREE.MeshPhongMaterial({ color: '#00FF00' })
          const YellowPhongMaterial = new THREE.MeshPhongMaterial({ color: '#FFFF00' })
          const RedPhongMaterial = new THREE.MeshPhongMaterial({ color: '#FF0000' })

          const GreenMatcapMaterial = new THREE.MeshMatcapMaterial({ color: '#336600' })
          const YellowMatcapMaterial = new THREE.MeshMatcapMaterial({ color: '#CC9900' })
          const RedMatcapMaterial = new THREE.MeshMatcapMaterial({ color: '#8B0000' })
          if (this.GreenLight) {
            EduStatus.GreenLight.material = GreenPhongMaterial
          } else {
            EduStatus.GreenLight.material = GreenMatcapMaterial
          }

          if (this.YellowLight) {
            EduStatus.YellowLight.material = YellowPhongMaterial
          } else {
            EduStatus.YellowLight.material = YellowMatcapMaterial
          }

          if (this.RedLight) {
            EduStatus.RedLight.material = RedPhongMaterial
          } else {
            EduStatus.RedLight.material = RedMatcapMaterial
          }

          // 1호시 동작시 product 생산
          if (this.ActionNum1 && this.No1Flag == false) {
            console.log('num1동작 and 생성되야함')
            new MonitoringOB(EduStatus)
            render.scene.add(EduStatus.product)
            this.No1Flag = true
          } else if (this.no2Action) {
            console.log('num2동작 & 위치변경')
            console.log('생성된 product : ', EduStatus.product)
          } else if (this.defaultDataSignal[15].value) {
            render.scene.remove(EduStatus.product)
            this.No1Flag = false
            this.WhiteColor = false
          }

          // console.log('test:', EduStatus.product)
          if (EduStatus.product) {
            const newObject = EduStatus.product

            //양품고품 판단
            if (machineElementsSorts[4].value === true) {
              this.WhiteColor = true
              console.log('칼라센서 통과', this.WhiteColor)
            }
            if (machineElementsSorts[11].value === true) {
              console.log('2호기 판단, 색깔은? ', this.WhiteColor)
              if (this.WhiteColor === false) {
                console.log('칼라 판단', this.WhiteColor)
                newObject.material.color.set('#FF0000') //빨간색
              } else {
                newObject.material.color.set('#FFFFFF') //흰색
                //
              }
            }

            // 1 ~ 3까지 시간 16.8414
            // 336.828
            //end포인트 도달시 제거
          }
        })
      })
    },
    getConnectInfo() {
      // console.log('야야 여기 체크해', this.$route.params.id)
      for (let i = 0; i < this.Machine.length; i++) {
        if (this.Machine[i].id == this.$route.params.id) {
          this.hostname = this.Machine[i].mqtt_name
          this.port = this.Machine[i].mqtt_port
          this.topic = this.Machine[i].mqtt_topic
          this.MachineId = this.$route.params.id
          // console.log('information check : ', this.hostname, this.port, this.topic, this.MachineId)
        }
      }
    },
    //이미지 업로드
    async getMonitoringInfo() {
      // console.log('getMonitoringInfo start check - machineId: ', this.MachineId)
      await this.getMonitoringInfoStoreAction({ machineId: this.MachineId }).then(() => {
        console.log('Success to get count information')
      })
    },
    userImgRenderFunction() {
      // console.log('no', this.assignedUser.userImage)
      this.userImgRender = require(`../../public/img/${this.assignedUser.userImage}`)
    },
    //스토어 리셋
    exit() {
      this.$store.commit('Monitoring/assignedUserDelete', null)
      this.client.on('close', function () {
        console.log('mqtt close')
      })
    },
    handleResize(event) {
      // const monitoring = document.querySelector('.Monitoring-body')
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
.div-back {
  position: absolute;
  top: 2%;
  left: 2%;
}
.div-back-icon {
  color: white;
}
.Monitoring-body {
  width: 100%;
  height: 100%;
  display: grid;
}

.to-left {
  color: white;
  padding: 2em;
  margin: 2.5em 0 0 2.5em;
  display: inline-block; /* or block */
  position: relative;
  border-color: white;
  text-decoration: none;
  transition: all 0.3s ease-out;
}
.to-left:before {
  content: '🡄';
  font-size: 1.5em;
  position: absolute;
  padding-top: 0.05em;
  top: 0;
  left: 50%;
  margin-left: -0.7em;
  border: solid 0.13em white;
  border-radius: 10em;
  width: 1.8em;
  height: 1.8em;
  line-height: 1.3em;
  border-color: inherit;
  transition: transform 0.5s ease-in;
}
.to-left:hover {
  color: #1976d2;
  border-color: #1976d2;
}
.to-left:hover:before {
  transform: rotate(360deg);
}
.monitoring__description {
  width: 40%;
  position: absolute;
  z-index: 500;
  /* text-align: center; */
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  /* text-transform: uppercase; */
  letter-spacing: 2px;
  margin: 5% 0 0 15%;
  line-height: 1;
  color: #fff;
}
.manager__img {
  width: 80px;
  height: 160px;
}
.monitoring__manager {
  display: flex;
  margin-left: 0.5%;
}
.monitoring__main__title {
  font-size: 3.5em;
}
.manager__description {
  font-size: 1.2em;
  margin: 2% 0 0 3%;
  width: 100%;
}

.chart {
  margin: 40% 0 0 0;
  width: 30%;
  height: 100%;
  position: relative;
  display: inline-block;
  margin: 0 0 0 70%;
  position: absolute;
}
</style>
