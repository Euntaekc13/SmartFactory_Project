<template>
  <body class="Monitoring-body">
    <div class="div-back">
      <router-link class="to-left" to="/" style="text-decoration: none"></router-link>
    </div>
    <div class="donut-chart" :data-percent="`${percent}`">
      <p>{{ percent }}%</p>
    </div>
  </body>
</template>

<script>
import { Scene, Renderer, Render, Control } from '../assets/ClassList'
import mqtt from 'mqtt'
import { mapState } from 'vuex'
import $ from 'jquery'
import axios from 'axios'

export default {
  name: 'Monitoring',
  data() {
    return {
      percent: 50,
      hostname: '192.168.0.72',
      port: '9001',
      path: '',
      topic: 'myEdukit'
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

    function Donut_chart(options) {
      this.settings = $.extend(
        {
          element: options.element,
          percent: 100
        },
        options
      )

      this.circle = this.settings.element.find('path')
      this.settings.stroke_width = parseInt(this.circle.css('stroke-width'))
      this.radius = (parseInt(this.settings.element.css('width')) / 1.5 - this.settings.stroke_width) / 2
      this.angle = -97.5 // Origin of the draw at the top of the circle
      this.i = Math.round(0.75 * this.settings.percent)
      this.first = true

      this.animate = function () {
        this.timer = setInterval(this.loop.bind(this), 10)
      }

      this.loop = function (data) {
        this.angle += 5
        this.angle %= 360
        var radians = (this.angle / 180) * Math.PI
        var x = this.radius + this.settings.stroke_width / 2 + Math.cos(radians) * this.radius
        var y = this.radius + this.settings.stroke_width / 2 + Math.sin(radians) * this.radius
        let d
        if (this.first == true) {
          d = this.circle.attr('d') + ' M ' + x + ' ' + y
          this.first = false
        } else {
          d = this.circle.attr('d') + ' L ' + x + ' ' + y
        }
        this.circle.attr('d', d)
        this.i--

        if (this.i <= 0) {
          clearInterval(this.timer)
        }
      }
    }

    $(function () {
      $('.donut-chart').each(function (index) {
        $(this).append(
          '<svg preserveAspectRatio="xMidYMid" xmlns:xlink="http://www.w3.org/1999/xlink" id="donutChartSVG' +
            index +
            '"><path d="M100,100" /></svg>'
        )
        var p = new Donut_chart({ element: $('#donutChartSVG' + index), percent: $(this).attr('data-percent') })
        p.animate()
      })
    })
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
          // let temp = JSON.parse(payload.toString())
          // let num0 = temp.Wrapper[0]
          // console.log('1차', num0)
          // this.$store.commit('Machine/FETCH_DATA', num0)

          async function getMachineStatus(type) {
            await axios
              .post(process.env.VUE_APP_API_DOMAIN + `/monitoring/update/part/1`, {
                count: 1,
                part_type: type
              })
              .then(response => {
                console.log('getMachineStatus res', response)
              })
          }

          let temp = JSON.parse(payload.toString())

          console.log(temp.Wrapper[2].value, typeof temp.Wrapper[2].value)
          console.log(localStorage.getItem('token1'), typeof localStorage.getItem('token1'))
          console.log(JSON.parse(localStorage.getItem('token1')), typeof JSON.parse(localStorage.getItem('token1')))

          if (temp.Wrapper[2].value == !JSON.parse(localStorage.getItem('token1'))) {
            if (temp.Wrapper[2].value == true) {
              localStorage.setItem('token1', false)
              getMachineStatus(1)
            } else {
              localStorage.setItem('token1', true)
            }
          }

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
.monitoring-body {
  width: 100vh;
}
.Monitoring-body {
  width: 100vw;
  height: 100vh;
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

.donut-chart svg {
  pointer-events: none;
  height: 100%;
}
.donut-chart svg path {
  fill: none;
  stroke-width: 35px;
  stroke: #19a8ff;
  position: absolute;
}

.donut-chart {
  width: 200px;
  height: 200px;
  position: relative;
  display: inline-block;
  margin: 0 0 0 80%;
  position: absolute;
}
.donut-chart p {
  margin: 0;
  position: absolute;
  top: 35%;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 2em;
  color: white;
}
.donut-chart span {
  display: block;
  font-size: 0.5em;
}
</style>
