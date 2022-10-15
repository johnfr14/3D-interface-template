import * as THREE from "three";
import EventEmitter from "./EventEmitter";
import Experience from "../Experience";
import Sizes from "./Sizes";

export default class Mouse extends EventEmitter {
  experience: Experience
  sizes: Sizes
  coor: THREE.Vec2
  
  constructor() 
  {
    super()

    this.experience = Experience.Instance()
    this.sizes = this.experience.sizes
    this.coor = new THREE.Vector2()

    window.addEventListener('mousemove', (event) =>{
      this.coor.x = (event.clientX / this.sizes.width) * 2 - 1
      this.coor.y = - (event.clientY / this.sizes.height) * 2 + 1
    })
  }
}