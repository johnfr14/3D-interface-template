import * as THREE from "three";
import { Scene } from "three";
import GUI from "lil-gui";
import Experience from "../Experience";
import Debug from "../Utils/Debug";
import Resources from "../Utils/Resources";
import Time from "../Utils/Time";
import { Wallet } from "ethers";

export default class User {
  // Class
  experience: Experience
  scene: Scene
  resources: Resources
  time: Time
  debug: Debug
  wallet?: Wallet

  // Model
  fox: { [key: string]: any } = {}

  // Debug
  debugFolder: GUI | undefined

  constructor() 
  {
    this.experience = Experience.Instance()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.fox.model = this.resources.items.foxModel
    this.debug = this.experience.debug

    if (this.debug.active) { this.debugFolder = this.debug.ui?.addFolder("fox") }

    this.setGLTF()
    this.setAnimation()
  }

  private setGLTF(): void 
  {
    this.fox.scene = this.resources.items.foxModel.scene
    this.fox.scene.scale.set(0.02, 0.02, 0.02)
    this.fox.scene.position.z += 4
    this.fox.scene.rotation.y = Math.PI
    this.scene.add(this.fox.scene)

    this.fox.scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) { child.castShadow = true }
    })
  }

  private setAnimation(): void 
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

  public update(): void 
  {
    this.fox.animation.mixer.update(this.time.delta * 0.001)
  }
}