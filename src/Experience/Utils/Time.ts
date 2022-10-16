import * as THREE from "three";
import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  clock: THREE.Clock
  oldTime: number = 0
  elapsedTime: number = 0
  deltaTime: number = 16

  constructor() {
    super()

    this.clock = new THREE.Clock()

    window.requestAnimationFrame(() => this.tick())
  }

  private tick() {
    this.elapsedTime = this.clock.getElapsedTime()
    this.deltaTime = this.elapsedTime - this.oldTime
    this.oldTime = this.elapsedTime;

    this.trigger('tick') 

    window.requestAnimationFrame(() => this.tick())
  }
}