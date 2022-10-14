export const sources = [
  /**
   * Cube textures
   */
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ]
  },
  /**
   * Textures
   */
  {
    name: "kekColorTexture",
    type: "texture",
    path: "textures/alchemicas/kek-material.png"
  },
  {
    name: "alphaColorTexture",
    type: "texture",
    path: "textures/alchemicas/alpha-material.png"
  },
  {
    name: "fomoColorTexture",
    type: "texture",
    path: "textures/alchemicas/fomo-material.png"
  },
  {
    name: "fudColorTexture",
    type: "texture",
    path: "textures/alchemicas/fud-material.png"
  },
  {
    name: "grassColorTexture",
    type: "texture",
    path: "textures/dirt/color.jpg"
  },
  {
    name: "grassNormalTexture",
    type: "texture",
    path: "textures/dirt/normal.jpg"
  },
  {
    name: "metalMatcapTexture",
    type: "texture",
    path: "textures/matcaps/3.png"
  },
  /**
   * GLTF models
   */
  {
    name: "foxModel",
    type: "gltfModel",
    path: "models/Fox/glTF/Fox.gltf"
  },
  {
    name: "singleChestModel",
    type: "gltfModel",
    path: "models/Chest/glTF/SingleChest.gltf"
  },
  /**
   * Sounds
   */
  {
    name: "clickSound",
    type: "sound",
    path: "sounds/click.mp3"
  },
  /**
   * Fonts
   */
  {
    name: "minecraft",
    type: "font",
    path: "fonts/Minecraft_Medium.json"
  },
  {
    name: "aovel",
    type: "font",
    path: "fonts/Aovel Sans Rounded_Rounded.json"
  },
]