import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { Group } from 'three'
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'
import { AmbientLight, DirectionalLight } from 'three'
import { WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Process } from './Chips'

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
    this.num1Group = new Group()
    this.num2Group = new Group()
    this.num3Group = new Group()
    this.machine = {}
    this.Product = {}
    this.setResource(data)
  }

  setResource(data) {
    // default-------------------------------
    if (data == 0) {
      const geometry = new THREE.BoxGeometry(5, 5, 5)
      const material = new THREE.MeshBasicMaterial({ color: '#FF0000' })
      const cube = (this.machine.num = new THREE.Mesh(geometry, material))

      if (cube.isMesh) {
        cube.castShadow = true
        cube.receiveShadow = true
      }
      this.num2Group.add(cube)
    }
    // 1호기-------------------------------
    else if (data === 1) {
      this.loader.load('/fbx/num1.FBX', object => {
        let obj = (this.machine.num1 = object)
        obj.name = 'machine'
        obj.scale.x = obj.scale.y = obj.scale.z = 0.0004
        obj.position.set(0, 7, 0)
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        if (obj) this.num1Group.add(obj)
      })

      /*   1호기 칩
      1. z축 start: 7 & end: 17
      2. x축 start:0  & end: 29.5
      */
      const pro = new Process()
      let Chip = pro.product.num1Chip
      // console.log(Chip)
      this.machine.num1Chip = Chip
      this.num1Group.add(Chip)
      //2호기----------------------------
    } else if (data === 2) {
      this.loader.load('/fbx/num2_inner.FBX', object => {
        let obj = (this.machine.num2Inner = object)
        obj.name = 'num2Inner'
        obj.scale.x = obj.scale.y = obj.scale.z = 0.026
        obj.position.set(-4.3, 4, 4.7)
        //1. z축 start: 4.7 / end : 12
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        if (obj) this.num2Group.add(obj)
      })
      this.loader.load('/fbx/num2_out.FBX', object => {
        let obj = (this.machine.num2Out = object)
        obj.name = 'num2Out'
        obj.scale.x = obj.scale.y = obj.scale.z = 0.017
        obj.position.set(0, 13, 0)
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        if (obj) this.num2Group.add(obj)
      })
      const pro = new Process()
      let Chip = pro.product.num2Chip
      this.machine.num2Chip = Chip
      this.num2Group.add(Chip)

      const Dev = new Process()
      let Device = Dev.product.Device
      this.machine.Device = Device
      this.num2Group.add(Device)
    }
    //3호기
    else if (data === 3) {
      this.loader.load('/fbx/StaticMesh4.FBX', object => {
        let obj = (this.machine.num3body = object)
        obj.name = 'num3body'
        obj.scale.x = obj.scale.y = obj.scale.z = 0.9
        obj.position.set(0, 0, 0)

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -170 * (Math.PI / 180)
        //1. z축 start: 4.7 / end : 12
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        if (obj) this.num3Group.add(obj)
      })
      this.loader.load('/fbx/StaticMesh3.FBX', object => {
        let obj = (this.machine.num3Y = object)
        obj.name = 'num3Y'
        obj.scale.x = obj.scale.y = obj.scale.z = 0.9
        obj.position.set(0, 2, 1.75)
        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -170 * (Math.PI / 180)
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        if (obj) this.num3Group.add(obj)
      })
      this.loader.load('/fbx/StaticMesh2.FBX', object => {
        let obj = (this.machine.num3XZ = object)
        obj.name = 'num3X'
        obj.scale.x = obj.scale.y = obj.scale.z = 0.9
        obj.position.set(2, 0.5, 3)
        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -10 * (Math.PI / 180)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        if (obj) this.num3Group.add(obj)
      })
      this.loader.load('/fbx/StaticMesh1.FBX', object => {
        let obj = (this.machine.catch = object)
        obj.name = 'num3catch'
        obj.scale.x = obj.scale.y = obj.scale.z = 0.9
        obj.position.set(5.5, 0.4, 3)

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -160 * (Math.PI / 180)
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        if (obj) this.num3Group.add(obj)
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
    this.setScene()
    this.setMesh()
    // this.setGrid()
  }
  setScene() {
    this.scene.background = new THREE.Color('#FFFFFF')

    this.scene.add(this.resource.num1Group)
    this.scene.add(this.resource.num2Group)
    this.scene.add(this.resource.num3Group)
    // this.scene.add(this.resource.Product)

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
    // console.log(element.clientWidth, element.clientHeight)
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
      this.controls.update()
      this.renderer.render(this.scene, this.camera)

      // const Chip = this.scene.children[0].children[0]
      // Chip.position.x += 0.04
      // console.log(this.machine)

      let num1Chip = this.machine.num1Chip
      let num2Chip = this.machine.num2Chip
      let Device = this.machine.Device
      let num2Inner = this.machine.num2Inner
      let num2ChipStat = true

      //1호기 set------------------------------
      try {
        if (num1Chip) {
          if (num1Chip.position.z >= 17) {
            num1Chip.position.x += 0.05
            if (num1Chip.position.x >= 29.5) {
              num1Chip.parent.remove(num1Chip)
            }
          } else {
            num1Chip.position.z += 0.07
          }
        }
      } catch {
        const pro = new Process()
        let num1Chip = pro.product.num1Chip
        this.machine.num1Chip = num1Chip
        this.scene.add(num1Chip)
      }
      //2호기 set----------------------------
      /*
      1.칩
      1-1)칩 start=>  x:-22, y:1, z:16
      1-2) 칩 end=>  x:27
      
      2.2호기 
      z축 start: 4.7 / end : 12
      
      3.주사위 
      3-1) start : x:-4.3 y:6 z: 8
      3-2) 투하 위치 이동=> z:14 
      3-3) 투하 후 이동=> x:27
      
      4. 주사위 던져지는 위치 x:-4.1, y:1, z:16
      */
      try {
        if (num2Chip.position.x >= 28) {
          num2ChipStat = false
          num2Chip.parent.remove(num2Chip)
        }
        num2Chip.position.x += 0.05

        if (Device.position.x == -4.3) {
          if (num2Inner.position.z < 13) {
            num2Inner.position.z += 0.05
          }
        }
        if (Device.position.x > -4.3 && num2Inner.position.z > 4.71) {
          num2Inner.position.z -= 0.05
          if (num2Inner.position.z == 4.7) {
            const pro = new Process()
            let Device = pro.product.Device
            this.machine.Device = Device
            this.scene.add(Device)
          }
        }
        if (Device.position.z <= 15.8) {
          Device.position.z += 0.05
        }
      } catch {
        if (!num2ChipStat) {
          num2ChipStat = true
          const pro = new Process()
          let num2Chip = pro.product.num2Chip
          this.machine.num2Chip = num2Chip
          this.scene.add(num2Chip)
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
}
