import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from "gsap";
import Experience from './Experience';
import Debug from './Utils/Debug';
import Sizes from './Utils/Sizes';
import GUI from 'lil-gui';
import User from "./World/User";

export default class Camera {
  // Classes
  experience: Experience
  debug: Debug
  sizes: Sizes
  scene: THREE.Scene
  user?: User
  canvas: HTMLCanvasElement

  // States of Camera
  instance: THREE.PerspectiveCamera | any
  controls: OrbitControls | any
  cameraToggle: Object = { unlockCamera: false }
  camAngle: { [key: string]: () => void } = {}
  cam: boolean = false
  transitions: { [key: string]: (duration: number) => void } = {}

  // Debug
  debugFolder: GUI | any
  positionDebugFolder: GUI | any
  targetDebugFolder: GUI | any

  constructor() {
    this.experience = Experience.Instance()
    this.debug = this.experience.debug
    this.sizes = this.experience.sizes 
    this.scene = this.experience.scene 
    this.canvas = this.experience.canvas

    this.setInstance()
    this.setControls()
    this.setCamAngles()
    this.setTransitions()

    this.camAngle.default()

    if(this.debug.active)
    {
      this.debugFolder.add(this.controls, 'enablePan')
      this.debugFolder = this.debug.ui!.addFolder('camera')
      this.debugFolder
      .add(this.cameraToggle, 'unlockCamera')
      .onChange(() => { this.cam ? this.camAngle.default() : this.camAngle.unlocked() })   

      this.positionDebugFolder = this.debugFolder.addFolder('cameraPosition')
      this.positionDebugFolder.add(this.instance.position, 'x').min(-20).max(20).step(0.1)
      this.positionDebugFolder.add(this.instance.position, 'y').min(-20).max(20).step(0.1)
      this.positionDebugFolder.add(this.instance.position, 'z').min(-20).max(20).step(0.1)

      this.targetDebugFolder = this.debugFolder.addFolder('cameraTarget')
      this.targetDebugFolder.add(this.controls.target, 'x').min(-20).max(20).step(0.1)
      this.targetDebugFolder.add(this.controls.target, 'y').min(-20).max(20).step(0.1)
      this.targetDebugFolder.add(this.controls.target, 'z').min(-20).max(20).step(0.1)
    }
  }

  setInstance(): void
  {
    let instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
    instance.position.set(6, 4, 8)
    this.scene.add(instance)
    this.instance = instance
  }

  setControls(): void
  {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.rotateSpeed = 1.2
    this.controls.zoomSpeed = 0.8
    this.controls.enableRotate = true
    this.controls.enableZoom = true
  }

  setCamAngles(): void
  {
    this.camAngle.unlocked = () =>
    {
      this.controls.maxDistance = 30
      this.controls.minDistance = 0
      this.controls.minAzimuthAngle = 0
      this.controls.maxAzimuthAngle = Math.PI * 1.999
      this.controls.minPolarAngle = 0
      this.controls.maxPolarAngle = Math.PI
      this.cam = true
    }

    this.camAngle.default = () =>
    {
      this.controls.minDistance = 7
      this.controls.maxDistance = 16
      this.controls.minAzimuthAngle = 0 
      this.controls.maxAzimuthAngle = Math.PI * 1.9999
      this.controls.minPolarAngle = 0
      this.controls.maxPolarAngle = Math.PI * 0.499 
      this.cam = false
    }
  }

  setTransitions(): void 
  {
    this.transitions.default = async (duration) =>
    {
      this.controls.enableRotate = false
      this.controls.enableZoom = false

      gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
      x: -11.1,
      y: -1,
      z: -7.6})
      
      gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
      x: 0,
      y: 0,
      z: -1})

      await this.sleep(1500)
      this.controls.enableRotate = true
      this.controls.enableZoom = true
    }
  }

  sleep(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resize(): void {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update(): void {
    // this.controls.target = 0
    this.controls.update()
  }
}