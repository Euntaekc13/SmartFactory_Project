import * as THREE from 'three'

export class MonitoringOB {
  constructor(object) {
    this.setMonitoring(object)
    this.Processnum1()
  }
  setMonitoring(object) {
    const ProGeometry = new THREE.CylinderGeometry(1, 1, 1.5, 20)
    const ProMeterial = new THREE.MeshPhongMaterial({ color: '#FFFFFF' })
    ProMeterial.metalness = true
    const Product = (object.product = new THREE.Mesh(ProGeometry, ProMeterial))

    Product.castShadow = true
    Product.receiveShadow = true
    Product.position.set(-14, 2, 8)
  }
}

export class Process {
  constructor() {
    this.product = {}
    this.Processnum1()
    this.Processnum2()
    this.ProcessDevice()
  }
  Processnum1() {
    const ProGeometry = new THREE.CylinderGeometry(2, 2, 1.5, 20)
    const ProMeterial = new THREE.MeshPhongMaterial({ color: '#FF0000' })
    ProMeterial.metalness = true
    const Product = new THREE.Mesh(ProGeometry, ProMeterial)
    Product.name = 'num1Chip'
    Product.castShadow = true
    Product.receiveShadow = true
    Product.position.set(0, 1.4, 7)
    // console.log(this.machine)
    this.product.num1Chip = Product
  }
  Processnum2() {
    const ProGeometry = new THREE.CylinderGeometry(2.5, 2.5, 1.5, 20)
    const ProMeterial = new THREE.MeshPhongMaterial({ color: '#FF0000' })
    ProMeterial.metalness = true
    const Product = new THREE.Mesh(ProGeometry, ProMeterial)
    Product.name = 'num2Chip'
    Product.castShadow = true
    Product.receiveShadow = true
    //초기 setting
    Product.position.set(-30, 1, 16)

    // console.log(this.machine)
    this.product.num2Chip = Product
  }
  ProcessDevice() {
    const DevGeometry = new THREE.BoxGeometry(3, 3, 3)
    const DevMeterial = new THREE.MeshPhongMaterial({ color: '#000000' })
    DevMeterial.metalness = true
    const Device = new THREE.Mesh(DevGeometry, DevMeterial)
    Device.name = 'Device'
    Device.castShadow = true
    Device.receiveShadow = true
    //초기 setting
    Device.position.set(-4.3, 6, 7.5)

    // console.log(this.machine)
    this.product.Device = Device
  }
}
