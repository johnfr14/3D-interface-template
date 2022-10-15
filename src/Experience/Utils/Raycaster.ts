import * as THREE from "three";
import Experience from "../Experience";
import Mouse from "./Mouse";
import Camera from "../Camera";
import PreLoader from "../PreLoader";
import World from "../World/World";
import User from "../World/User";

export default class Raycaster {
  experience: Experience
  scene: THREE.Scene
  mouse: Mouse
  camera: Camera
  preLoader: PreLoader
  raycaster?: THREE.Raycaster
  world?: World
  user?: User

  currentIntersect?: THREE.Intersection

  constructor() {
    this.experience = Experience.Instance()
    this.scene = this.experience.scene
    this.mouse = this.experience.mouse;
    this.camera = this.experience.camera
    this.preLoader = this.experience.preLoader

    this.preLoader.on("start", () => 
    {
      this.world = this.experience.world
      this.user = this.world.user
      this.raycaster = new THREE.Raycaster()
      this.raycaster.setFromCamera(this.mouse.coor, this.camera.instance)
  
      // Connect button
      window.addEventListener('click', async (event) => 
      {
        this.click()
        const intersects = this.raycaster?.intersectObject(this.user!.wallet.mesh["connect"])
  
        if (intersects?.length) 
        {
          if (this.user!.wallet.isConnected) 
          { 
            this.user!.wallet.disconnect() 
          } 
          else 
          { 
            this.user!.wallet.connect() 
          }
        }
      })
    })
  }

  click() 
  {
    this.raycaster?.setFromCamera(this.mouse.coor, this.camera.instance)
  }
}