import * as THREE from "three";
import {TextGeometry, TextGeometryParameters} from "three/examples/jsm/geometries/TextGeometry.js";
import Experience from "../Experience";
import Resources from "./Resources";

export default class Factory {
  experience: Experience
  resources: Resources

  constructor() 
  {
    this.experience = Experience.Instance()
    this.resources = this.experience.resources
  }

  public createTextMesh(text: string, color?: string, obj?: TextGeometryParameters): THREE.Mesh<THREE.BufferGeometry, THREE.Material>
  {
    const textGeometry = new TextGeometry(
      text, 
      {
        font: this.resources.items.aovel, 
        size: obj?.size || 0.5,
        height: obj?.height || 0.2,
        curveSegments: obj?.curveSegments || 12,
        bevelEnabled: obj?.bevelEnabled || true,
        bevelThickness: obj?.bevelThickness || 0.03,
        bevelSize: obj?.bevelSize || 0.02,
        bevelOffset: obj?.bevelOffset || 0,
        bevelSegments: obj?.bevelSegments || 5 
      }
    )
    textGeometry.center()
    const textMaterial = new THREE.MeshMatcapMaterial({ color: color || "white" })
    // textMaterial.wireframe = true
    return new THREE.Mesh(textGeometry, textMaterial)
  }

  public createSmartContractMesh() {}
}