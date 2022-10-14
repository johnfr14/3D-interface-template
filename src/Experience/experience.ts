import * as THREE from "three"
import { sources } from "./sources"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from "./Camera"
import Renderer from "./Renderer"
import World from "./World/World"
import Resources from "./Utils/Resources"
import Debug from "./Utils/Debug"
import Mouse from "./Utils/Mouse"
import Raycaster from "./Utils/Raycaster"
import PreLoader from "./PreLoader"

declare global {
  interface Window { experience: any }
}

export default class Experience {
  private static _instance: Experience | null;
  
  debug: Debug
  canvas: HTMLCanvasElement
  sizes: Sizes
  time: Time
  scene: THREE.Scene
  resources: Resources
  preLoader: PreLoader
  mouse: Mouse
  camera: Camera
  renderer: Renderer
  world: World
  raycaster: Raycaster
  
  constructor(canvas: HTMLCanvasElement) {
    Experience._instance = this
     
    this.debug = new Debug()
    this.canvas = canvas
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.preLoader = new PreLoader()
    this.mouse = new Mouse(this)
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    this.world = new World(this)
    this.raycaster = new Raycaster(this)
    
    this.sizes.on('resize', () => this.resize())
    this.time.on("tick", () => this.update())

  }

  private resize(): void {
    this.camera.resize()
    this.renderer.resize()
  }

  private update(): void {
    this.raycaster.update()
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  public static Instance(canvas?: HTMLCanvasElement)
  {
      return this._instance || (this._instance = new this(canvas!));
  }
}

