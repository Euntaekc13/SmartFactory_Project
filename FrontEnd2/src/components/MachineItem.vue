<template>
  <div class="machine-container">
    <div class="machine__Process__list">
      <div class="ImgDiv">
        <div :class="`Img${processData.processType}`"></div>
      </div>
      <div class="machine__Process__desc">
        <div class="desc__LineName">
          <div>
            <p>Process type: {{ processData.processType }}</p>
          </div>
        </div>
        <div class="desc__Number">
          <div>
            <p>Count: {{ processData.processCount }}</p>
          </div>
        </div>
        <div class="desc__LifeCycle">
          <div>
            <p>Max Life Cycle: {{ processData.processMax }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as THREE from 'three'
import { Scene, Renderer, Render } from '../WebGL/Process'
export default {
  name: 'MachineItem',
  props: {
    processData: Object
  },
  data() {
    return {
      lol: 'lol',
      data: this.processData.processType
    }
  },
  created() {
    this.checkThis()
  },
  mounted() {
    this.Graphic(this.data)
  },
  methods: {
    Graphic(data) {
      if (data == 1) {
        this.SetGraphics(data)
        return
      }
      if (data == 2) {
        this.SetGraphics(data)
        return
      }
      if (data == 3) {
        this.SetGraphics(data)
        return
      }
    },

    SetGraphics(data) {
      const Img = document.querySelector(`.Img${this.processData.processType}`)
      Img.style.width = '100%'
      Img.style.height = '85%'

      let scene = new Scene(data)
      let cameraElement = scene.camera.cameraElement
      let sceneElement = scene.sceneElement
      let renderer = new Renderer(Img)
      let renderElement = renderer.domElement
      let rendererElement = renderer.rendererElement

      let render = new Render(sceneElement)
      render.element = Img
      render.render = renderElement
      render.scene = sceneElement
      render.machine = scene.resource.machine
      render.camera = cameraElement
      render.renderer = rendererElement
      render.start()
    },

    checkThis() {
      console.log('들어오나?')
      console.log(this.processData)
    }
  }
}
</script>

<style scoped>
.machine-container {
  width: 100%;
  height: 100%;
  margin: 1% 0% 1% 1%;
  position: relative;
  margin-right: 3%;
}

.machine-container:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
.machine__Process__list {
  display: flex;
  height: 100%;
}
.ImgDiv {
  margin: 2% 1% 0 0;
  width: 40%;
  height: 100%;
}
.machine__Process__desc {
  margin: 10% 0 0 10%;
  padding: 5% 0 0 5%;
  font-weight: 500;
}
</style>
