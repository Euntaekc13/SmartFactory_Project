<template>
  <body class="Monitoring-body">
    <div class="div-back">
      <router-link class="to-left" to="/" style="text-decoration: none"></router-link>
    </div>
    <div class="chart">
      <dash-board />
    </div>
  </body>
</template>

<script>
import DashBoard from '../components/Dashboard.vue'
import { Scene, Renderer, Render, Control } from '../assets/ClassList'
import mqtt from 'mqtt'
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'Monitoring',
  components: {
    DashBoard
  },
  data() {
    return {
      percent: 50,
      hostname: '192.168.0.72',
      port: '9001',
      path: '',
      topic: 'machine'
    }
  },
  computed: {
    ...mapState('Machine', {
      data: 'data'
    })
  },
  created() {
    this.connectMqtt()
  },
  mounted() {
    this.connection()
  },
  methods: {
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

      // Control Setting
      let control = new Control(cameraElement, renderElement)
      let controlElement = control.controlElement

      // Render Setting
      let render = new Render()
      render.element = container
      render.controls = controlElement
      render.scene = sceneElement
      render.edukit = scene.resource.edukit
      render.camera = cameraElement
      render.renderer = rendererElement

      // Rendering Start
      render.start()
      this.setEvent(scene.resource.edukit)
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
    setEvent(edukit) {
      this.client.on('connect', () => {
        console.log('MQTT Connected')
        this.client.subscribe([this.topic], () => {
          console.log(`토픽 연결 완료: ${this.topic}`)
        })
        this.client.on('message', (topic, payload) => {
          // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`);
          let temp = JSON.parse(payload.toString())
          let num0 = temp.Wrapper[0]
          console.log('1차', num0)
          this.$store.commit('Machine/FETCH_DATA', num0)

          let message = JSON.parse(payload)
          let data = message.Wrapper.filter(p => p.tagId === '21' || p.tagId === '22')
          data = data.map(p => parseInt(p.value))

          edukit['yAxis'] = data[0]
          edukit['xAxis'] = data[1]
        })
      })
    }
  }
}
</script>

<style scoped>
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
  font-size: 0.9em;
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
