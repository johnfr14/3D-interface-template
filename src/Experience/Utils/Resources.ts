import * as THREE from "three";
import { Howl } from 'howler'
import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import PreLoader from "../PreLoader";
import Experience from "../Experience";

type Sources = {
  name: string, 
  type: string, 
  path: any
}

type Loaders = {
  fontLoader: FontLoader,
  gltfLoader: GLTFLoader,
  textureLoader: THREE.TextureLoader,
  cubeTextureLoader: THREE.CubeTextureLoader,
  listener: THREE.AudioListener,
  audioLoader: THREE.AudioLoader
}

export default class Resources extends EventEmitter {
  experience: Experience
  preloader: PreLoader

  sources: Sources[]
  items: {[key: string]: any}
  loadingManager!: THREE.LoadingManager
  toLoad: number;
  loaded: number = 0
  loaders!: Loaders

  constructor(sources: Sources[]) {
    super()

    this.experience = Experience.Instance()
    this.preloader = this.experience.preLoader

    this.sources = sources
    this.items = {}
    this.toLoad = this.sources.length;

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {
      fontLoader: new FontLoader(this.loadingManager),
      gltfLoader: new GLTFLoader(this.loadingManager),
      textureLoader: new THREE.TextureLoader(this.loadingManager),
      cubeTextureLoader: new THREE.CubeTextureLoader(this.loadingManager),
      listener: new THREE.AudioListener(),
      audioLoader: new THREE.AudioLoader(this.loadingManager)
    }
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel")
        this.loaders.gltfLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "texture")
        this.loaders.textureLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "cubeTexture")
        this.loaders.cubeTextureLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "font")
        this.loaders.fontLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "sound")
        this.loaders.audioLoader.load(source.path, () => this.audioLoad(source))
    }
  }

  audioLoad(source: Sources) {
    const sound = new Howl({ src: [source.path] });
    this.sourcesLoaded(source, sound)
  }

  sourcesLoaded(source: Sources, file: unknown) {
    this.trigger('itemLoaded')

    this.items[source.name] = file
    this.loaded++;

    if (this.loaded === this.toLoad) this.trigger("ready")
  }
}