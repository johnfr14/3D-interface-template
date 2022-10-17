import * as THREE from "three";
import { Scene, Vector3 } from "three";
import GUI from "lil-gui";
import Experience from "../Experience";
import Debug from "../Utils/Debug";
import Resources from "../Utils/Resources";
import Time from "../Utils/Time";
import Wallet from "../Utils/Wallet";
import Camera from "../Camera";

export default class User {
  // Class
  experience: Experience
  scene: Scene
  resources: Resources
  camera: Camera
  time: Time
  debug: Debug
  wallet: Wallet

  // Model
  fox: { [key: string]: any } = {}
  isMoving: boolean = false
  movements: { [key: string]: boolean } = {
    "ArrowUp": false, 
    "ArrowDown": false, 
    "ArrowLeft": false, 
    "ArrowRight": false,
  }
  movementType: string = "idle"
  movementMultiplier: { [key: string]: number } = {"idle": 1, "walk": 1, "run": 3}

  // Debug
  debugFolder: GUI | undefined
  positionDebugFolder: GUI | undefined
  rotationDebugFolder: GUI | undefined

  constructor() 
  {
    this.experience = Experience.Instance()
    this.wallet = new Wallet(this)
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.fox.model = this.resources.items.foxModel
    this.debug = this.experience.debug
    this.camera.user = this

    if (this.debug.active) { this.debugFolder = this.debug.ui?.addFolder("fox") }

    this.setGLTF()
    this.setAnimations()
    this.setActions()

    if (this.debug.active) 
    {
      this.debugFolder = this.debug.ui!.addFolder('fox')  

      this.positionDebugFolder = this.debugFolder.addFolder('positions')
      this.positionDebugFolder.add(this.fox.scene.position, 'x').min(-2000).max(2000).step(0.1)
      this.positionDebugFolder.add(this.fox.scene.position, 'y').min(-20).max(100).step(0.1)
      this.positionDebugFolder.add(this.fox.scene.position, 'z').min(-2000).max(2000).step(0.1)

      this.rotationDebugFolder = this.debugFolder.addFolder('rotation')
      this.rotationDebugFolder.add(this.fox.scene.rotation, 'x').min(0).max(Math.PI * 2).step(0.1)
      this.rotationDebugFolder.add(this.fox.scene.rotation, 'y').min(0).max(Math.PI * 2).step(0.1)
      this.rotationDebugFolder.add(this.fox.scene.rotation, 'z').min(0).max(Math.PI * 2).step(0.1)
    }
  }

  private setGLTF(): void 
  {
    this.fox.scene = this.resources.items.foxModel.scene
    this.fox.scene.scale.set(0.02, 0.02, 0.02)
    this.scene.add(this.fox.scene)

    this.fox.scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) { child.castShadow = true }
    })
    this.camera.controls.target = this.fox.scene.position
    console.log(this.camera)
  }

  private setAnimations(): void 
  {
    this.fox.animation = {}
    this.fox.animation.mixer = new THREE.AnimationMixer(this.fox.scene)
    
    this.fox.animation.action = {}
    this.fox.animation.action.idle = this.fox.animation.mixer.clipAction(this.fox.model.animations[0])
    this.fox.animation.action.walk = this.fox.animation.mixer.clipAction(this.fox.model.animations[1])
    this.fox.animation.action.run = this.fox.animation.mixer.clipAction(this.fox.model.animations[2])

    this.fox.animation.action.current = this.fox.animation.action.idle
    this.fox.animation.action.current.play()
  }

  private setActions(): void 
  {
    window.addEventListener("keydown", (event) => 
    {
      switch (event.key) {
        // Run
        case "ArrowUp":
          this.isMoving = true
          this.movements["ArrowUp"] = true
          this.movements["ArrowDown"] = false
          this.movementType = "run"
          this.fox.animation.action.current = this.fox.animation.action.run
          this.fox.animation.action.current.play()
          this.fox.animation.action.walk.stop()
          break

        // Walk
        case "ArrowDown":
          this.isMoving = true
          this.movements["ArrowDown"] = true
          this.movements["ArrowUp"] = false
          this.movementType = "walk"
          this.fox.animation.action.current = this.fox.animation.action.walk
          this.fox.animation.action.current.play()
          break

        // Rotate left
        case "ArrowLeft":
          this.movements["ArrowLeft"] = true
          if (!this.isMoving) 
          { 
            this.movementType = "walk"
            this.fox.animation.action.current = this.fox.animation.action.walk
            this.fox.animation.action.current.play() 
          }
          break

        // Rotate right
        case "ArrowRight":
          this.movements["ArrowRight"] = true
          if (!this.isMoving) 
          { 
            this.movementType = "walk"
            this.fox.animation.action.current = this.fox.animation.action.walk
            this.fox.animation.action.current.play()  
          }
          break
        default:
          console.error("Error while moving")
      }
      
    })

    window.addEventListener("keyup", (event) => 
    {
      if (event.key === "ArrowUp" || event.key === "ArrowDown")
      {
        this.movements[event.key] = false
        this.isMoving = false
        this.movementType = "idle"
        this.fox.animation.action.current = this.fox.animation.action.idle
        this.fox.animation.action.run.stop()
        this.fox.animation.action.walk.stop()
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight")
      {
        this.movements[event.key] = false
        if (!this.isMoving) 
        { 
          this.movementType = "idle"
          this.fox.animation.action.current = this.fox.animation.action.idle
          this.fox.animation.action.walk.stop()
        }
      }
    })
  }

  // Update the position of user for each frame depending of the key pressed => {up, down, left, right}
  private move(): void
  {
    const vector = new Vector3()
    const direction: THREE.Vector3 = this.fox.scene.getWorldDirection(vector)

    if (this.movements.ArrowUp)
    {
      this.fox.scene.position.z += (this.time.deltaTime * direction.z) * 9
      this.fox.scene.position.x += (this.time.deltaTime * direction.x) * 9
      this.camera.instance.position.y = 20
      this.camera.instance.position.z = -10
    }
    if (this.movements.ArrowDown)
    {
      this.fox.scene.position.z -= (this.time.deltaTime * direction.z) * 3
      this.fox.scene.position.x -= (this.time.deltaTime * direction.x) * 3
    }
    if (this.movements.ArrowLeft)
    {
      this.fox.scene.rotation.y += this.time.deltaTime * 3
    }
    if (this.movements.ArrowRight)
    {
      this.fox.scene.rotation.y -= this.time.deltaTime * 3
    }
  }

  public update(): void 
  {
    this.move()
    this.fox.animation.mixer.update(this.time.deltaTime * this.movementMultiplier[this.movementType])
  }
}