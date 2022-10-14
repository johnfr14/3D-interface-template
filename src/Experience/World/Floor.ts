import * as THREE from "three";
import Experience from "../Experience";
import Resources from "../Utils/Resources";

export default class Floor {
  // Class
  experience: Experience
  scene: THREE.Scene
  resources: Resources

  // Mesh
  geometry: THREE.CircleGeometry | any
  textures: { [key:string]: any } = {}
  material: THREE.MeshStandardMaterial | any
  mesh: THREE.Mesh | any

  constructor() {
    this.experience = Experience.Instance()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setGeometry()
    this.setTexture()
    this.setMaterial()
    this.setMesh()
  }

  private setGeometry(): void 
  {
    this.geometry = new THREE.CircleGeometry(5, 64)
  }

  private setTexture() 
  {
    this.textures.color = this.resources.items.grassColorTexture
    this.textures.color.encoding = THREE.sRGBEncoding
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.grassNormalTexture
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  private setMaterial() 
  {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal
    })
  }

  private setMesh() 
  {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}