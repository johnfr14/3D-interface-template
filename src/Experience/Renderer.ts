import * as THREE from "three"
import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import Camera from "./Camera"
import { WebGL1Renderer } from "three"

export default class Renderer {
  instance: WebGL1Renderer
  experience: Experience
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: THREE.Scene
  camera: Camera

  constructor() {
    this.experience = Experience.Instance()
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    this.instance = this.setInstance()
  }

  setInstance(): WebGL1Renderer {
    let instance = new THREE.WebGL1Renderer({
      canvas: this.canvas,
      antialias: true,
    })
    instance.physicallyCorrectLights = true;
    instance.outputEncoding = THREE.sRGBEncoding;
    instance.toneMapping = THREE.CineonToneMapping;
    instance.toneMappingExposure = 1.75;
    instance.shadowMap.enabled = true;
    instance.shadowMap.type = THREE.PCFSoftShadowMap;
    instance.setClearColor('#211d20');
    instance.setSize(this.sizes.width, this.sizes.height);
    instance.setPixelRatio(this.sizes.pixelRatio);
    return instance;
  }

  resize(): void {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update(): void {
    this.instance.render(this.scene, this.camera.instance!)
  }
}