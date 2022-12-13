<template>
  <body class="Monitoring-body">
    <div class="div-back">
      <router-link class="to-left" to="/" style="text-decoration: none"></router-link>
    </div>
    <div class="monitoring__description">
      <div class="Title">
        <p class="monitoring__main__title">FACTORY1 {{ process1Count }} {{ process2Count }} {{ process3Count }}</p>
      </div>
      <div class="monitoring__manager">
        <div class="manager__img">
          <v-img src="/img/P20190811_193913465_3F594CA7-3551-487C-AC12-5A2145F03B53.JPG"></v-img>
        </div>
        <div class="manager__description">
          <p class="monitoring__subtitle">Manager : {{ TokenUser.name }} {{ TokenUser.employee_number }}</p>
          <p class="monitoring__subtitle">E-mail : {{ TokenUser.email }}</p>
          <p class="monitoring__subtitle">Phone : {{ TokenUser.phone_number }}</p>
        </div>
      </div>
    </div>
    <div class="chart">
      <dash-board />
    </div>
  </body>
</template>

<script>
import DashBoard from '../components/Dashboard.vue'
import { Scene, Renderer, Render } from '../assets/ClassList'
import mqtt from 'mqtt'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Monitoring',
  components: {
    DashBoard
  },
  data() {
    return {
      hostname: '***.***.*.**', //
      port: '****', //
      path: '',
      // topic: 'machine',
      start: '', //공정시작 동작
      ActionNum1: '', //1호기 동작
      ActionNum2: '', //2호기 동작
      ActionNum3: '', //3호기 동작

      Num1Status: '', //1호기 상태
      Num2Status: '', //2호기 상태
      Num3Status: '', //3호기 상태
      GreenLight: '', //초록불
      YellowLight: '', //노란불
      RedLight: '', //빨간불
      total: 0, //일일총생산
      failure: 0, //일일고품
      goodSet: 0, //일일양품
      FacName: '',
      Manager: '',
      ManagerEmail: '',
      ManagerPhone: '',

      process1Count: 10,
      process1TotalCount: 100,
      no1Action: false,
      process2Count: 10,
      process2TotalCount: 100,
      no2Action: false,
      testStatus: false,
      testColor: 'white',
      process3Count: 10,
      process3TotalCount: 100,
      no3Action: false,
      machineId: '',
      assignedUser: {
        userName: '',
        userEmail: '',
        userPhone: '',
        userImage: ''
      }
    }
  },
  computed: {
    ...mapState('Machine', {
      data: 'data',
      Line: 'Line'
    }),
    ...mapState('Auth', {
      TokenUser: 'TokenUser'
    })
  },
  created() {
    this.getConnectInfo()
    this.connectMqtt()
    this.getMonitoringInfo()
  },
  mounted() {
    this.connection()
    // this.getMonitoringInfo()
  },
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
      let render = new Render()
      render.element = container
      // render.controls = controlElement
      render.render = renderElement
      render.scene = sceneElement
      render.edukit = scene.resource.edukit
      render.camera = cameraElement
      render.renderer = rendererElement

      // Rendering Start
      render.start()
      console.log('start아래 GL : ', this.GreenLight)
      this.setEvent(scene.resource.edukit, scene.Object)
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
    setEvent(edukit, EduStatus) {
      this.client.on('connect', () => {
        console.log('MQTT Connected')
        this.client.subscribe([this.topic], () => {
          console.log(`토픽 연결 완료: ${this.topic}`)
        })
        this.client.on('message', (topic, payload) => {
          // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`);
          // let temp = JSON.parse(payload.toString())
          // console.log('받아온 데이터 : ', temp)
          // let num0 = temp.Wrapper[0]
          // this.$store.commit('Machine/FETCH_DATA', num0)

          let message = JSON.parse(payload)
          let data = message.Wrapper.filter(p => p.tagId === '16' || p.tagId === '17')

          this.RedLight = message.Wrapper[10].value //빨간불
          this.YellowLight = message.Wrapper[9].value //노란불
          this.GreenLight = message.Wrapper[8].value //초록불

          this.start = message.Wrapper[0].value //시작

          this.ActionNum1 = message.Wrapper.filter(p => p.tagId === '3').value
          this.ActionNum2 = message.Wrapper.filter(p => p.tagId === '4').value
          this.ActionNum3 = message.Wrapper.filter(p => p.tagId === '5').value
          // 계산

          // Cycle 계산
          // process 1 count cycle
          if (message.Wrapper[2].value !== this.no1Action) {
            message.Wrapper[2].value ? ((this.no1Action = true), (this.process1Count += 1)) : (this.no1Action = false)
          }
          // process 2 count cycle
          if (message.Wrapper[14].value !== this.no2Action) {
            message.Wrapper[14].value ? ((this.no2Action = true), (this.process2Count += 1)) : (this.no2Action = false)
          }
          // process 3 count cycle
          if (message.Wrapper[18].value !== this.no3Action) {
            message.Wrapper[18].value ? ((this.no3Action = true), (this.process3Count += 1)) : (this.no3Action = false)
          }

          // 양품 고품 판단
          if (message.Wrapper[5].value == false) {
            if (message.Wrapper[11].value == true) {
              this.testColor = 'red'
            }
          }
          if (message.Wrapper[2].value == true) {
            this.testColor = 'white'
          }

          // this.StatusNum1 = message.Wrapper.filter(p => p.tagId === '13').value
          // this.StatusNum2 = message.Wrapper.filter(p => p.tagId === '13').value
          // this.StatusNum3 = message.Wrapper.filter(p => p.tagId === '13').value
          // this.Total = message.Wrapper.filter(p => p.tagId === '13').value
          // this.Failure = message.Wrapper.filter(p => p.tagId === '13').value
          // this.GoodSet = message.Wrapper.filter(p => p.tagId === '13').value

          data = data.map(p => parseInt(p.value))

          edukit['yAxis'] = data[0]
          edukit['xAxis'] = data[1]

          console.log(EduStatus)
          if (this.GreenLight) {
            EduStatus.GreenLight.material.color.set('#00FF00')
          } else {
            EduStatus.GreenLight.material.color.set('#336600')
          }

          if (this.YellowLight) {
            EduStatus.YellowLight.material.color.set('#FFFF00')
          } else {
            EduStatus.YellowLight.material.color.set('#CC9900')
          }

          if (this.RedLight) {
            EduStatus.RedLight.material.color.set('#FF0000')
          } else {
            EduStatus.RedLight.material.color.set('#8B0000')
          }
          //object.material.color.set(THREE.MathUtils.randInt(0x000000, 0xffffff))
        })
      })
    },
    getConnectInfo() {
      for (let i = 0; i < this.Line.length; i++) {
        if (this.Line[i].id == this.$route.params.id) {
          this.hostname = this.Line[i].mqtt_name
          this.port = this.Line[i].mqtt_port
          this.topic = this.Line[i].mqtt_topic
          this.machineId = this.$route.params.id
          console.log('information check : ', this.hostname, this.port, this.topic)
        }
      }
    },
    getMonitoringInfo() {
      console.log('getMonitoringInfo start check - machineId: ', this.machineId)
      this.total = 100
      this.goodSet = 97
      this.failure = 3
      this.getMonitoringInfoStoreAction({ machineId: this.machineId }).then(result => {
        console.log('Success to get count information', result)
      })
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
  width: 100vw;
  height: 100vh;
  display: grid;
}

.to-left {
  color: white;
  padding-top: 2em;
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
  padding: 0.05em 0 0 0.25em;
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
  margin: 20% 0 0 0;
  width: 30%;
  height: 100%;
  position: relative;
  display: inline-block;
  margin: 0 0 0 70%;
  position: absolute;
}
</style>
