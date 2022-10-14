import * as THREE from "three";
import Experience from "../Experience";
import Resources from "../Utils/Resources";

export default class Environment {
  // Class
  experience: Experience
  scene: THREE.Scene
  resources: Resources

  // environment
  sunlight: THREE.DirectionalLight | any
  environmentMap: { [key: string]: any } = {}

  constructor() 
  {
    this.experience = Experience.Instance()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setSunlight()
    this.setEnvironmentMap()
  }

  private setSunlight(): void
  {
    this.sunlight = new THREE.DirectionalLight('#ffffff', 2)
    this.sunlight.castShadow = true
    this.sunlight.shadow.camera.far = 15
    this.sunlight.shadow.mapSize.set(1024, 1024)
    this.sunlight.shadow.normalBias = 0.05
    this.sunlight.position.set(3.5, 2, - 1.25)
    this.scene.add(this.sunlight)
  }

  private setEnvironmentMap(): void
  {
    this.environmentMap.intensity = 0.4 
    this.environmentMap.texture = this.resources.items.environmentMapTexture
    this.environmentMap.texture.encoding = THREE.sRGBEncoding
    
    this.scene.environment = this.environmentMap.texture

    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
          child.material.envMap = this.environmentMap.texture
          child.material.envMapIntensity = this.environmentMap.intensity
          child.material.needsUpdate = true
        }
      })
    }

    this.environmentMap.updateMaterial()
  }
}