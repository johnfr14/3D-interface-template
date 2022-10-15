import * as THREE from "three";
import Experience from "../Experience";
import Factory from "./Factory";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import Resources from "./Resources";
import User from "../World/User";

declare global {
  interface Window { ethereum: any }
}

export default class Wallet {
  experience: Experience
  user: User
  scene: THREE.Scene
  resources: Resources
  factory: Factory
  
  ethereum: any
  provider: Web3Provider
  isConnected = false
  network = ''
  mesh: { [key: string]: THREE.Mesh } = {}

  constructor(user: User) {
    this.experience = Experience.Instance()
    this.user = user
    this.scene = this.experience.scene
    this.resources = this.experience.resources;
    this.factory = this.experience.factory

    this.ethereum = window.ethereum
    this.provider = new ethers.providers.Web3Provider(window.ethereum);

    this.setConnect()

    window.ethereum.on('chainChanged', (chainId: number) => window.location.reload());
  }

  private setConnect(): void
  {
    this.mesh["connect"] = this.factory.createTextMesh("connect", "#5f2300")
    this.mesh["connected"] = this.factory.createTextMesh("connected", "green")

    this.mesh["connect"].position.set(3, 2, 0)
    this.mesh["connected"].position.set(3, 2, 0)
    this.mesh["connect"].rotation.y = -Math.PI * 0.15
    this.mesh["connected"].rotation.y = -Math.PI * 0.15

    this.scene.add(this.mesh["connect"])
  }

  public connect(): void {}
  public disconnect(): void {}

  public update(): void {}
}