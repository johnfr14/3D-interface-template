import * as THREE from "three"
import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import User from "./User";
import Resources from "../Utils/Resources";

export default class World {
  // Classes
  experience: Experience
  scene: THREE.Scene
  resources: Resources
  floor?: Floor
  user?: User
  environment?: Environment


  constructor() {

    this.experience = Experience.Instance();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    const gridHelper = new THREE.GridHelper(100, 100);
    this.scene.add(gridHelper);


    this.resources.on("ready", () => {
      this.floor = new Floor();
      this.user = new User();
      this.environment = new Environment();
    })

  }

  update(): void 
  {
    if (this.user) { this.user.update() }
  }

}