import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'
import { AmbientLight, DirectionalLight } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Group } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'
import { WebGLRenderer } from 'three'

export class Camera {
  constructor() {
    this.camera = new CinematicCamera(1000, 1, 1, 2000)

    this.setCamera()
  }
  setCamera() {
    this.camera.position.set(70, 300, 400)
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

export class Resource {
  constructor(file) {
    this.loader = new FBXLoader()
    this.obj = new Group()

    this.edukit = {}
    this.setResource(file)
  }

  setResource(file) {
    if (!file) {
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0x0a0ffa })
      const cube = new THREE.Mesh(geometry, material)

      if (cube.isMesh) {
        cube.castShadow = true
        cube.receiveShadow = true
      }

      this.obj.add(cube)
    } else if (file === 'edukit') {
      this.loader.load('fbx/body.FBX', object => {
        let obj = (this.edukit.body = object)
        obj.name = 'body'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.0005
        obj.position.x -= 15
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.loader.load('fbx/StaticMesh1.FBX', object => {
        // 3호기 집게
        let obj = (this.edukit.staticMesh1 = object)
        obj.name = 'StaticMesh1'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.5

        obj.position.x = 10
        obj.position.y = 0.5
        obj.position.z = 2.6

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -160 * (Math.PI / 180)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.loader.load('fbx/StaticMesh2.FBX', object => {
        // 3호기 집게 축
        let obj = (this.edukit.staticMesh2 = object)
        obj.name = 'StaticMesh2'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.5

        obj.position.x = 6.7
        obj.position.y = -1.3
        obj.position.z = 2.8

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -10 * (Math.PI / 180)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.loader.load('fbx/StaticMesh3.FBX', object => {
        // 3호기 Y축
        let obj = (this.edukit.staticMesh3 = object)
        obj.name = 'StaticMesh3'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.5

        obj.position.x = 5
        obj.position.z = 1.4

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -170 * (Math.PI / 180)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.loader.load('fbx/StaticMesh4.FBX', object => {
        // 3호기 몸체
        let obj = (this.edukit.staticMesh4 = object)
        obj.name = 'StaticMesh4'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.5

        obj.position.x = 5

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -170 * (Math.PI / 180)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.edukit.yAxis = -27
      this.edukit.xAxis = -4375
    }
  }
}

export class Scene {
  constructor(file = null) {
    this.scene = new THREE.Scene()

    this.resource = new Resource(file)
    this.camera = new Camera()
    this.light = new Light()

    this.setScene()
    this.setMesh()
    this.setGrid()
  }

  setScene() {
    this.scene.background = new THREE.Color(0x101010)

    this.scene.add(this.resource.obj)

    this.scene.add(this.light.ambientLight)

    this.scene.add(this.camera.camera)

    this.scene.add(this.light.dirLight)
  }

  setMesh() {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x101010, depthWrite: false })
    )
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.receiveShadow = true

    this.scene.add(this.mesh)
  }

  setGrid() {
    this.grid = new THREE.GridHelper(2000, 300, 0x000000, 0x000000)
    this.grid.material.opacity = 0.3
    this.grid.material.transparent = true

    this.scene.add(this.grid)
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
  // statsFPS = new this.Stats()
  constructor() {
    this.status = true
  }
  start() {
    // this.statsFPS.domElement.style.cssText = 'position:absolute; top:50px;left:50px;'
    // this.statsFPS.showPanel(1)
    // this.statsFPS.update()

    this.status = window.requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera)
      this.controls.update()
      if (this.edukit && Object.keys(this.edukit).length === 7) {
        let yAxis = parseFloat(this.edukit.staticMesh1.position.y.toFixed(1))
        let nowyAxisMoterValue = this.normalization(8, 0.5, this.edukit.yAxis, 1).toFixed(1)
        if (yAxis < nowyAxisMoterValue) {
          this.edukit.staticMesh1.position.y += 0.05
          this.edukit.staticMesh2.position.y += 0.05
          this.edukit.staticMesh3.position.y += 0.05
        } else if (yAxis > nowyAxisMoterValue) {
          this.edukit.staticMesh1.position.y -= 0.05
          this.edukit.staticMesh2.position.y -= 0.05
          this.edukit.staticMesh3.position.y -= 0.05
        }

        let xAxis = parseFloat(this.edukit.staticMesh1.position.x.toFixed(1))
        let nowxAxisMoterValue = this.normalization(5, 10, this.edukit.xAxis, 2).toFixed(1)
        if (xAxis > nowxAxisMoterValue) {
          this.edukit.staticMesh1.position.x -= 0.015
          this.edukit.staticMesh2.rotation.z -= 0.0048
          this.edukit.staticMesh2.position.x -= 0.0055
          this.edukit.staticMesh2.position.z += 0.005
        } else if (xAxis < nowxAxisMoterValue) {
          this.edukit.staticMesh1.position.x += 0.015
          this.edukit.staticMesh2.rotation.z += 0.0048
          this.edukit.staticMesh2.position.x += 0.0055
          this.edukit.staticMesh2.position.z -= 0.005
        }

        let zAxis = parseFloat(this.edukit.staticMesh1.position.z.toFixed(1))
        let nowzAxisMoterValue = this.normalization(8, 2.6, this.edukit.xAxis, 2).toFixed(1)
        if (zAxis < nowzAxisMoterValue) {
          this.edukit.staticMesh1.position.z += 0.017
        } else if (zAxis > nowzAxisMoterValue) {
          this.edukit.staticMesh1.position.z -= 0.017
        }
      }
      this.start()
    })
  }

  stop() {
    window.cancelAnimationFrame(this.status)
  }

  status(value) {
    this.status = value
  }

  normalization(max, min, value, moterNumber) {
    const MAX_MOTER1 = 1301828 // yAxis Moter
    const MIN_MOTER1 = -27
    const MAX_MOTER2 = 25021563 // xAxis Moter
    const MIN_MOTER2 = -4375
    return moterNumber === 1
      ? ((max - min) * (value + MIN_MOTER1)) / (MAX_MOTER1 + MIN_MOTER1) + min
      : ((max - min) * (value + MIN_MOTER2)) / (MAX_MOTER2 + MIN_MOTER2) + min
  }
}
export class Control {
  constructor(camera, domElement) {
    this.controls = new OrbitControls(camera, domElement)

    this.setControl()
  }

  setControl() {
    this.controls.minDistance = 50
    this.controls.maxDistance = 100
    this.controls.target.set(0, 0, 0)
    this.controls.enableDamping = true
  }

  get controlElement() {
    return this.controls
  }
}
