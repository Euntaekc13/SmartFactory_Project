import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { AmbientLight, DirectionalLight } from 'three'
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
    this.camera.position.set(8, 25, 68)
    this.camera.lookAt(8, 14, 0)
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
      this.loader.load('/fbx/body.FBX', object => {
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

      this.loader.load('/fbx/StaticMesh1.FBX', object => {
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

      this.loader.load('/fbx/StaticMesh2.FBX', object => {
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

      this.loader.load('/fbx/StaticMesh3.FBX', object => {
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

      this.loader.load('/fbx/StaticMesh4.FBX', object => {
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
    // this.setGrid()
  }

  setScene() {
    this.scene.background = new THREE.Color(0x101010)

    this.scene.add(this.resource.obj)

    this.scene.add(this.light.ambientLight)

    this.scene.add(this.camera.camera)

    this.scene.add(this.light.dirLight)
  }

  setMesh() {
    //바닥
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x101010, depthWrite: false })
    )
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
    // 3D글씨
    this.fontloader = new FontLoader()
    this.font = this.fontloader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
      this.options = {
        font: font,
        size: 2,
        height: 5,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 5,
        bevelSize: 2,
        bevelOffset: 2,
        bevelSegments: 15
      }
      this.textgeometry2 = new TextGeometry('June-Kyu\nFactory', this.options)
      this.material = new THREE.MeshStandardMaterial({
        color: '#2c97de',

        roughness: 0.3,
        metalness: 0.7
      })
      this.textmesh2 = new THREE.Mesh(this.textgeometry2, this.material)
      this.textmesh2.position.set(-18, 20, 0)
      this.textmesh2.rotation.set(-0.07, 0.3, 0)
      this.scene.add(this.textmesh1)
      this.scene.add(this.textmesh2)
    })
    this.sphereGeometry = new THREE.SphereGeometry(0.5, 10, 10)
    this.sphereMaterial = new THREE.MeshPhongMaterial({ color: '#FF0000' })
    //1호기 동작상태
    this.Num1Status = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
    this.Num1Status.position.set(-12.5, 12, 10)
    this.scene.add(this.Num1Status)
    //2호기 동작상태
    this.Num2Status = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
    this.Num2Status.position.set(-5.8, 12, 0)
    this.scene.add(this.Num2Status)
    //3호기 동작상태
    this.Num3Status = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
    this.Num3Status.position.set(5, 15, 0)
    this.scene.add(this.Num3Status)

    //-------공정 상태------
    this.EduStatus = new Group()

    //뚜껑
    const headerMetry = new THREE.CylinderGeometry(1, 1, 1, 20)
    const headerMaterial = new THREE.MeshMatcapMaterial({ color: '#808080' })
    headerMaterial.metalness = true
    const header = new THREE.Mesh(headerMetry, headerMaterial.clone())
    header.castShadow = true
    header.receiveShadow = true
    header.position.set(0, 18.55, 0)
    // this.scene.add(header)
    this.EduStatus.add(header)
    //빨간불
    const RedMetry = new THREE.CylinderGeometry(1, 1, 2, 20)
    const RedMeterial = new THREE.MeshMatcapMaterial({ color: '#990000' }) // lightOn:#FF0000 Off:#990000
    RedMeterial.metalness = true
    const RedL = new THREE.Mesh(RedMetry, RedMeterial)
    RedL.castShadow = true
    RedL.receiveShadow = true
    RedL.position.set(0, 17, 0)
    // this.scene.add(RedL)
    this.EduStatus.add(RedL)

    //노란불
    const YellowMetry = new THREE.CylinderGeometry(1, 1, 2, 20)
    const YellowMeterial = new THREE.MeshMatcapMaterial({ color: '#CC9900' }) // lightOn:	#FFFF00 Off:#CC9900
    YellowMeterial.metalness = true
    const YellowL = new THREE.Mesh(YellowMetry, YellowMeterial)
    YellowL.castShadow = true
    YellowL.receiveShadow = true
    YellowL.position.set(0, 15, 0)
    // this.scene.add(YellowL)
    this.EduStatus.add(YellowL)
    //초록불
    const GreenMetry = new THREE.CylinderGeometry(1, 1, 2, 20)
    const GreenMeterial = new THREE.MeshMatcapMaterial({ color: '#336600' }) // lightOn: #00FF00 Off:#336600
    GreenMeterial.metalness = true
    const GreenL = new THREE.Mesh(GreenMetry, GreenMeterial)
    GreenL.castShadow = true
    GreenL.receiveShadow = true
    GreenL.position.set(0, 13, 0)
    // this.scene.add(GreenL)
    this.EduStatus.add(GreenL)

    //연결목
    const connectMetry = new THREE.CylinderGeometry(1, 0.5, 2, 20)
    const connectMaterial = new THREE.MeshMatcapMaterial({ color: '#808080' })
    connectMaterial.metalness = true
    const connector = new THREE.Mesh(connectMetry, connectMaterial.clone())
    connector.castShadow = true
    connector.receiveShadow = true
    connector.position.set(0, 11, 0)
    // this.scene.add(connector)
    this.EduStatus.add(connector)

    //기둥
    const bodyMetry = new THREE.CylinderGeometry(0.5, 0.5, 10, 20)
    const bodyMaterial = new THREE.MeshMatcapMaterial({ color: '#808080' })
    bodyMaterial.metalness = true
    const body = new THREE.Mesh(bodyMetry, bodyMaterial.clone())
    body.castShadow = true
    body.receiveShadow = true
    body.position.set(0, 5, 0)
    // this.scene.add(body)
    this.EduStatus.add(body)

    //바닥판
    const footMetry = new THREE.CylinderGeometry(1, 1, 1, 20)
    const footMaterial = new THREE.MeshMatcapMaterial({ color: '#808080' })
    footMaterial.metalness = true
    const footer = new THREE.Mesh(footMetry, footMaterial.clone())
    footer.castShadow = true
    footer.receiveShadow = true
    footer.position.set(0, 0, 0)
    // this.scene.add(footer)
    this.EduStatus.add(footer)

    //신호등 setting
    this.EduStatus.position.set(14, 13.5, -13)
    this.EduStatus.rotation.set(0.18, 0, 0)
    this.scene.add(this.EduStatus)
    //-------공정 상태------
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
  constructor() {
    this.status = true
    this.start()
  }
  start() {
    this.status = window.requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera)
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
