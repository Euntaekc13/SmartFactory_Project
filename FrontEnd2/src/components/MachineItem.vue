<template>
  <div class="machine-container">
    <div class="machine__Process__list">
      <div :class="`ImgDiv${processData.processType}`"></div>
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
import { Scene, Renderer, Render, Control } from '../assets/Process'
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
    },

    SetGraphics(data) {
      const ImgDiv = document.querySelector(`.ImgDiv${this.processData.processType}`)
      ImgDiv.style.width = '40%'
      ImgDiv.style.height = '85%'

      let scene = new Scene(data)
      let cameraElement = scene.camera.cameraElement
      let sceneElement = scene.sceneElement
      let renderer = new Renderer(ImgDiv)
      let renderElement = renderer.domElement
      let rendererElement = renderer.rendererElement

      let control = new Control(cameraElement, renderElement)
      let controlElement = control.controlElement

      let render = new Render(sceneElement)
      render.element = ImgDiv
      render.render = renderElement
      render.controls = controlElement
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
  margin: 2% 1% 0 10%;
  width: 30%;
  height: 100%;
}
.ImgDiv__Img {
  margin: 10%;
}
.machine__Process__desc {
  margin: 10% 0 0 10%;
}
</style>
