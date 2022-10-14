import { Howl, Howler } from 'howler';
import Experience from "./Experience";
import Debug from "./Utils/Debug";
import arcade from "../../public/sounds/arcade.mp3";

export default class Sound {
  muted: boolean = false
  experience: Experience
  debug: Debug
  arcade: any

  constructor() {
    this.experience = Experience.Instance()
    this.debug = this.experience.debug

    this.arcade = new Howl({
      src: [arcade],
      volume: 0.15
    });
  }

  setMute()
  {
    // Set up
    this.muted = typeof this.debug !== 'undefined'
    Howler.mute(this.muted)

    // M Key
    window.addEventListener('keydown', (_event) =>
    {
      if(_event.key === 'm')
      {
        this.muted = !this.muted
        Howler.mute(this.muted)
      }
    })

    // Tab focus / blur
    document.addEventListener('visibilitychange', () =>
    {
      if(document.hidden)
      {
        Howler.mute(true)
      }
      else
      {
        Howler.mute(this.muted)
      }
    })
  }

  playArcade() {
    this.arcade.play()
}
}