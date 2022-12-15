<template>
  <body class="Monitoring-body">
    <div class="div-back">
      <button @click="deleteImg()">
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
import { Scene, Renderer, Render } from '../assets/ClassList'
import mqtt from 'mqtt'
import { mapState, mapActions } from 'vuex'
import * as THREE from 'three'

class newProduct {
  constructor(object) {
    this.setProduct(object)
  }
  setProduct(object) {
    const ProGeometry = new THREE.CylinderGeometry(1, 1, 1.5, 20)
    const ProMeterial = new THREE.MeshPhongMaterial({ color: '#FFFFFF' })
    ProMeterial.metalness = true
    const Product = (object.product = new THREE.Mesh(ProGeometry, ProMeterial))

    Product.castShadow = true
    Product.receiveShadow = true
    Product.position.set(-14, 2, 8)
  }
}

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
      Num1Status: '', //1호기 상태
      Num2Status: '', //2호기 상태
      Num3Status: '', //3호기 상태
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
      FacName: '',
      Manager: '',
      ManagerEmail: '',
      ManagerPhone: '',
      no1Action: false,
      no2Action: false,
      no3Action: false,

      machineId: '',
      userImgRender: '',
      // flag
      No1Flag: false,
      // 전역변수
      firstFlag: false, // 1호기
      secondFlag: false, // 2호기
      thirdFlag: false // 3호기
    }
  },
  computed: {
    ...mapState('Machine', {
      Machine: 'Machine'
    }),
    ...mapState('Auth', {
      TokenUser: 'TokenUser'
    }),
    ...mapState('Monitoring', {
      assignedUser: 'assignedUser',
      cycleCount: 'cycleCount'
    })
  },
  async created() {
    this.getConnectInfo()
    this.connectMqtt()
    await this.getMonitoringInfo()
    this.userImgRenderFunction()
    console.log('Monitoring created value : ', this.userImgRender)
    //(this.port = '9001'), (this.hostname = '192.168.0.58'), (this.topic = 'machine')
  },
  mounted() {
    this.connection()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    // console.log("beforeDestroy...");
    window.removeEventListener('resize', this.handleResize)
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

      console.log(scene.Object)
      // Rendering Start
      render.start()
      this.setEvent(scene.resource.edukit, scene.Object, render)
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
          // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`);
          // let temp = JSON.parse(payload.toString())
          // let num0 = temp.Wrapper[0]
          // console.log('1차', num0)
          // this.$store.commit('Machine/FETCH_DATA', num0)

          let message = JSON.parse(payload)
          let data = message.Wrapper.filter(p => p.tagId === '16' || p.tagId === '17')
          this.RedLight = message.Wrapper[10].value //빨간불
          this.YellowLight = message.Wrapper[9].value //노란불
          this.GreenLight = message.Wrapper[8].value //초록불
          this.start = message.Wrapper[0].value //시작
          if (this.start) {
            this.output.fanAction = true
            console.log('mqtt 시간: ', message.Wrapper[26])
          } else {
            this.output.fanAction = false
          }
          // Cycle 계산
          // process 1 count cycle
          if (message.Wrapper[19].value || this.start) {
            if (message.Wrapper[2].value !== this.no1Action) {
              message.Wrapper[2].value
                ? ((this.no1Action = true), (this.output.process1Count += 1), (this.firstFlag = true))
                : (this.no1Action = false)
            }
            // process 2 count cycle
            if (message.Wrapper[14].value !== this.no2Action) {
              message.Wrapper[14].value
                ? ((this.no2Action = true), (this.output.process2Count += 1), (this.secondFlag = true))
                : (this.no2Action = false)
            }
            // process 3 count cycle
            if (message.Wrapper[18].value !== this.no3Action) {
              message.Wrapper[18].value
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
          this.ActionNum1 = message.Wrapper[2].value
          data = data.map(p => parseInt(p.value))
          edukit['yAxis'] = data[0]
          edukit['xAxis'] = data[1]

          console.log(EduStatus) //scene 내부의 mesh list
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

          //1호시 동작시 product 생산
          if (this.ActionNum1 && this.No1Flag == false) {
            console.log(this.ActionNum1)
            new newProduct(EduStatus)
            this.No1Flag = true
          }
          if (EduStatus.product) {
            console.log('EduStatus.product : ', EduStatus.product)
            const Product = [{ XendPoint: 9.8 }, { Zendpoint: 10 }]
            const newObject = EduStatus.product
            Product.push(newObject)
            render.scene.add(newObject)
            if (newObject.position.z >= 10) {
              newObject.position.x += 0.1
            } else {
              newObject.position.z += 0.19
            }
            //양품고품 판단
            if (message.Wrapper[5].value == false) {
              if (message.Wrapper[11].value == true) {
                newObject.material.color.set('#FF0000') //red
              }
            }
            // 1 ~ 3까지 시간 16.8414
            // 336.828
            //end포인트 도달시 제거
            if (newObject.position.x >= 9.8) {
              Product.pop()
              render.scene.remove(newObject)
              this.No1Flag = false
            }
          }
        })
      })
    },
    getConnectInfo() {
      console.log('야야 여기 체크해', this.$route.params.id)
      for (let i = 0; i < this.Machine.length; i++) {
        if (this.Machine[i].id == this.$route.params.id) {
          this.hostname = this.Machine[i].mqtt_name
          this.port = this.Machine[i].mqtt_port
          this.topic = this.Machine[i].mqtt_topic
          this.MachineId = this.$route.params.id
          console.log('information check : ', this.hostname, this.port, this.topic, this.MachineId)
        }
      }
    },
    //이미지 업로드
    async getMonitoringInfo() {
      console.log('getMonitoringInfo start check - machineId: ', this.MachineId)
      await this.getMonitoringInfoStoreAction({ machineId: this.MachineId }).then(() => {
        console.log('Success to get count information')
      })
    },
    userImgRenderFunction() {
      console.log('no', this.assignedUser.userImage)
      this.userImgRender = require(`../../public/img/${this.assignedUser.userImage}`)
    },
    //스토어 리셋
    deleteImg() {
      this.$store.commit('Monitoring/assignedUserDelete', null)
      console.log(this.userImgRender)
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
  margin: 20% 0 0 0;
  width: 30%;
  height: 100%;
  position: relative;
  display: inline-block;
  margin: 0 0 0 70%;
  position: absolute;
}
</style>
