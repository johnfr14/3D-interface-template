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
import Factory from "./Utils/Factory"

export default class Experience {
  private static _instance: Experience | null;
  
  debug: Debug
  canvas: HTMLCanvasElement
  sizes: Sizes
  time: Time
  scene: THREE.Scene
  resources: Resources
  preLoader: PreLoader
  factory: Factory
  mouse: Mouse
  camera: Camera
  renderer: Renderer
  world: World
  raycaster: Raycaster
  
  constructor(canvas: HTMLCanvasElement) {
    // Singleton
    Experience._instance = this

    // set up Utils classes
    this.debug = new Debug()
    this.canvas = canvas
    this.sizes = new Sizes()
    this.time = new Time()
    this.mouse = new Mouse()

    // Set up the scene in canvas (loading page)
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.preLoader = new PreLoader()
    this.factory = new Factory()
    this.camera = new Camera()
    this.renderer = new Renderer()

    // Set up the world with all the models & how we will interact with them
    this.world = new World()
    this.raycaster = new Raycaster()
    
    this.sizes.on('resize', () => this.resize())
    this.time.on("tick", () => this.update())

  }

  private resize(): void {
    this.camera.resize()
    this.renderer.resize()
  }

  private update(): void {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  public static Instance(canvas?: HTMLCanvasElement)
  {
    return this._instance || (this._instance = new this(canvas!));
  }
}
