import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { Group } from 'three'
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'
import { AmbientLight, DirectionalLight } from 'three'
import { WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Camera {
  constructor() {
    this.camera = new CinematicCamera(1000, 1, 1, 2000)
    this.setCamera()
  }
  setCamera() {
    this.camera.position.set(25, 25, 45)
    this.camera.lookAt(0, 0, 0)
  }
  get cameraElement() {
    return this.camera
  }
}
export class Light {
  constructor() {
    this.ambientLight = new AmbientLight(0x20202a, 6.5, 100)
    this.dirLight = new DirectionalLight(0xffffff, 0.5)

    this.setLight()
  }

  setLight() {
    this.dirLight.position.set(2, 10, 1)
    this.dirLight.castShadow = true
  }

  get lightElement() {
    return this.dirLight
  }
}
export class Control {
  constructor(camera, domElement) {
    this.controls = new OrbitControls(camera, domElement)

    this.setControl()
  }

  setControl() {
    this.controls.minDistance = 10
    this.controls.maxDistance = 50
    this.controls.target.set(0, 0, 0)
    this.controls.enableDamping = true
  }

  get controlElement() {
    return this.controls
  }
}
export class Resource {
  constructor(data) {
    this.loader = new FBXLoader()
    this.num2Group = new Group()
    this.machine = {}
    this.ProductTag = {}
    this.setResource(data)
  }

  setResource(data) {
    if (data == 1) {
      const geometry = new THREE.BoxGeometry(5, 5, 5)
      const material = new THREE.MeshBasicMaterial({ color: '#FF0000' })
      const cube = (this.machine.num = new THREE.Mesh(geometry, material))

      if (cube.isMesh) {
        cube.castShadow = true
        cube.receiveShadow = true
      }
      this.num2Group.add(cube)
    } else if (data === 2) {
      this.loader.load('/fbx/num1.FBX', object => {
        let obj = (this.machine.num1 = object)
        obj.name = 'machine'
        obj.scale.x = obj.scale.y = obj.scale.z = 0.0004
        obj.position.set(0, 0, 0)
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.num2Group.add(obj)
      })
    } else if (data === 3) {
      this.loader.load('/fbx/num2.FBX', object => {
        let obj = (this.machine.num2 = object)
        obj.name = 'machine'
        obj.scale.x = obj.scale.y = obj.scale.z = 0.2
        obj.position.set(0, -2, 0)
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        if (obj) this.num2Group.add(obj)
      })
    }
  }
}
export class Scene {
  constructor(file = null) {
    this.scene = new THREE.Scene()
    this.resource = new Resource(file)
    this.camera = new Camera()
    this.light = new Light()
    this.Objectstatus = false
    this.machine = {}
    this.Object = {}
    this.setScene()
    this.setMesh()
    // this.setGrid()
  }
  setScene() {
    this.scene.background = new THREE.Color('#FFFFFF')

    this.scene.add(this.resource.num2Group)

    this.scene.add(this.light.ambientLight)

    this.scene.add(this.camera.camera)

    this.scene.add(this.light.dirLight)
  }
  setMesh() {
    //바닥
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: '#FFFFFF', depthWrite: false })
    )
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
  setLight() {
    this.scene.add(this.light.dirLight)
  }
  setLightHelper() {
    this.helper = new THREE.CameraHelper(this.light.dirLight.shadow.camera)
    this.scene.add(this.helper)
  }
  removeHelper() {
    this.scene.remove(this.helper)
  }
  setCameraHelper() {
    this.helper = new THREE.CameraHelper(this.camera.cameraElement)
    this.scene.add(this.helper)
  }
  get sceneElement() {
    return this.scene
  }
}
export class Renderer {
  constructor(element) {
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true })

    this.setRenderer(element)
  }

  setRenderer(element) {
    this.renderer.setPixelRatio(1)
    this.renderer.shadowMap.enabled = true
    this.renderer.setSize(element.clientWidth || 500, element.clientHeight || 500)
    console.log(element.clientWidth, element.clientHeight)
    element.appendChild(this.renderer.domElement)
  }

  get domElement() {
    return this.renderer.domElement
  }

  get rendererElement() {
    return this.renderer
  }
}
export class Render {
  constructor() {
    this.status = true
    this.start()
  }
  start() {
    this.status = window.requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera)
      this.start()
    })
  }

  stop() {
    window.cancelAnimationFrame(this.status)
  }

  status(value) {
    this.status = value
  }
}
